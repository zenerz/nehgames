import VisualAspect from "../common/visualaspect";
import Office from "./office";
import OfficeMovement from "./officemovement";
import Tools from "./tools";
import Cams from "./cams";
import GameAssets from "./assets";
import UI from "./ui";
import KeyControlls from "../common/keycontrolls";
import MainMenu from "./mainmenu";
import { LocationMap } from "./locationmap";
import { ToyFreddy, ToyBonnie, ToyChica } from "./animatronic";

export default class Game extends VisualAspect {
    static async init(root) {
        super.init(root);

        this.maskOn, this.camUp = false;
        this.leftVentLightOn, this.rightVentLightOn = false;
        this.flashLightOn = false;
        this.blackout = false;
        this.blackoutElapsed = 0;
        this.currentCam = '09';
        this.keyControlls = new KeyControlls();
        
        this.blackoutFlashTime = 0;
        this.blackoutElapsed = 0;

        this.musicBoxProgress = 100;
        this.musicBoxInterval = 0.2;
        this.musicBoxElapsed = 0;

        this.musicBoxWinding = false;
        this.musicBoxWindingInterval = 0.5;
        this.musicBoxWindingElapsed = 0;

        await OfficeMovement.init(root, this.container);
        await Office.init(root, this.container);
        await Cams.init(root, this.container);
        await Tools.init(root, this.container);
        this.container.swapChildren(Cams.container, Tools.container);
        await UI.init(root, this.container);

        this.container.visible = false;
    }

    static start(options) {
        this.container.visible = true;
        MainMenu.container.visible = false;
        GameAssets.audio.bgmusic.stop();
        GameAssets.audio.fansound.play({loop: true});
        // GameAssets.callaudios.call1.play({volume: 0.33});
        this.locationMap = new LocationMap([
            '01', '02', '03', '04',
            '05', '06',
            '07', '08', '09',
            '10', '11', '12',
            'Left Vent', 'Right Vent',
            'Office Hall Close', 'Office Hall Far', 'Office',
        ]);
        this.locationMap.locations.get('Office').capacity = 1;
        this.locationMap.populate({
            ToyBonnie: new ToyBonnie({aiLevel: 20, movementInterval: 5.0}),
            ToyChica: new ToyChica({aiLevel: 20, movementInterval: 5.0}),
            ToyFreddy: new ToyFreddy(20),
        });
        this.blackoutQueue = [];
        this.attackQueue = [];

        this.blackoutFlashTime = 0;
        this.blackoutElapsed = 0;
        Office.blackoutBox.alpha = 1;

        this.maskOn, this.camUp = false;
        this.leftVentLightOn, this.rightVentLightOn = false;
        this.flashLightOn = false;
        this.blackout = false;
        this.blackoutElapsed = 0;
        this.currentCam = '09';

        this.musicBoxProgress = 100;
        this.musicBoxInterval = 0.33;
        this.musicBoxElapsed = 0;

        Office.container.x = 0;
    }

    static end() {
        this.container.visible = false;
        MainMenu.container.visible = true;
        MainMenu.static1Anim.playAnimation();
        Object.values(GameAssets.audio).forEach( audio => {
            audio.stop();
        });
        Object.values(GameAssets.callaudios).forEach( audio => {
            audio.stop();
        });
        GameAssets.audio.bgmusic.play({loop: true});
    }

    static blackoutSequence() {
        this.blackout = true;
        if (!GameAssets.audio.stare.isPlaying)
            GameAssets.audio.stare.play();
        this.blackoutFlashTime = 0;
        this.blackoutElapsed = 0;
        Office.blackoutBox.alpha = 1;
    }

    static musicBox() {
        this.musicBoxWinding = true;
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);

        if (this.locationMap) {
            this.locationMap.update(ticker);
        }

        this.musicBoxElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
        if (this.musicBoxElapsed >= this.musicBoxInterval) {
            this.musicBoxElapsed = 0;
            if (this.musicBoxProgress > 0) {
                this.musicBoxProgress -= 1;
            }
        }
        if (this.musicBoxWinding && this.musicBoxProgress < 100 && this.camUp) {
            this.musicBoxWindingElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.musicBoxWindingElapsed >= this.musicBoxWindingInterval) {
                this.musicBoxWindingElapsed = 0;
                this.musicBoxProgress += 5;
            }
            if (this.musicBoxProgress >= 100) {
                this.musicBoxProgress = 100;
            }
        } else {
            this.musicBoxWindingElapsed = 0;
        }
    }
}