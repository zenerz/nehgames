import { Container } from "pixi.js";
import VisualAspect from "../common/visualaspect";
import Office from "./office";
import OfficeMovement from "./officemovement";
import Tools from "./tools";
import GameAssets from "./assets";

export default class Game extends VisualAspect {
    static async init(root) {
        super.init(root);



        await Office.init(root, this.container);
        await OfficeMovement.init(root, this.container);
        await Tools.init(root, this.container);

        this.container.visible = false;
    }

    static start(options) {
        this.container.visible = true;
        GameAssets.audio.fansound.play({loop: true});
        GameAssets.callaudios.call1.play();
    }

    static updateLoop(ticker) {
        if (!this.container.visible) return;
    }
}