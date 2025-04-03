import { Container } from "pixi.js";
import VisualAspect from "../common/visualaspect";
import Office from "./office";
import OfficeMovement from "./officemovement";
import Tools from "./tools";
import Cams from "./cams";
import GameAssets from "./assets";
import UI from "./ui";
import KeyControlls from "../common/keycontrolls";
import { Animatronic } from "./animatronics/animatronic";
import MainMenu from "./mainmenu";

export default class Game extends VisualAspect {
    static async init(root) {
        super.init(root);

        this.maskOn, this.camUp = false;
        this.leftVentLightOn, this.rightVentLightOn = false;
        this.flashLightOn = false;
        this.currentCam = '09';
        this.locations = {
            '09': [],
            '10': [],
            '11': [],
            '12': [],
            '08': [],
            '07': [],
            '06': [],
            '05': [],
            '04': [],
            '03': [],
            '02': [],
            '01': [],
            'Office': [],
            'OfficeHallway': [],
        }
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
        this.animatronics = {
            test: new Animatronic(20, 5)
        }

    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (this.animatronics) {
            for (const animatronic of Object.values(this.animatronics)) animatronic.movement(ticker, () => {})
        }
    }
}