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
import ToyBonnie from "./animatronics/toybonnie";
import ToyChica from "./animatronics/toychica2";
import ToyFreddy from "./animatronics/toyfreddy";
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

        await OfficeMovement.init(root, this.container);
        await Office.init(root, this.container);
        await Cams.init(root, this.container);
        await Tools.init(root, this.container);
        this.container.swapChildren(Cams.container, Tools.container);
        await UI.init(root, this.container);

        this.container.visible = false;
    }

    static start(options) {
        MainMenu.container.visible = false;
        this.container.visible = true;
        GameAssets.audio.bgmusic.stop();
        GameAssets.audio.fansound.play({loop: true});
        // GameAssets.callaudios.call1.play();
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
            ToyBonnie: new ToyBonnie(),
            
            ToyFreddy: new ToyFreddy(20),
        });
        this.blackoutQueue = [];
        this.attackQueue = [];
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (this.locationMap) {
            this.locationMap.update(ticker);
        }
    }
}