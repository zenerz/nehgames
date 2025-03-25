import { Container } from "pixi.js";
import root from "../fnaf2/rootcontainer";

export default class VisualAspect {

    static async init() {
        this.container = new Container();
        this.deltaTime = 0;
        root.visualAspects.push(this);
    }

    static add(e) {
        return this.container.addChild(e);
    }

    static updateLoop(ticker) {
        this.deltaTime = ticker.deltaTime/ticker.FPS;
    }
}