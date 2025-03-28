import { Container } from "pixi.js";

export default class VisualAspect {

    static async init(root, parent) {
        this.container = new Container();
        this.deltaTime = 0;
        root.visualAspects.push(this);
        console.log(parent)
        if (parent == undefined)
            root.addChild(this.container);
        else
            parent.addChild(this.container);
    }

    static add(e) {
        return this.container.addChild(e);
    }

    static updateLoop(ticker) {
        this.deltaTime = ticker.deltaTime/ticker.FPS;
        if (!this.container.visible) return;
    }
}