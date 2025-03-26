import { Graphics, Rectangle, Ticker } from "pixi.js";
import VisualAspect from "../common/visualaspect";
import Office from "./office";
import Tools from "./tools";
import root from "./rootcontainer";

export default class OfficeMovement extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        const daAlpha = 0.0;
        const moveWidth = 0.375;
        this.movePercentage = 0.015;
        this.moveLeft, this.moveRight = false;

        /** @type {Graphics} */
        this.leftRegion = this.add(new Graphics().rect(0, 0, root.nativeResolution.x*moveWidth, root.nativeResolution.y).fill(0xffff00));
        this.leftRegion.alpha = daAlpha;
        this.leftRegion.eventMode = 'static';
        this.leftRegion.onpointerenter = e => {
            this.moveLeft = true;
            this.moveRight = false;
        };
        this.leftRegion.onpointerleave = e => {
            if (e.global.x < 0) return;
            const detect = new Rectangle(0, 0, innerWidth*moveWidth, innerHeight);
            if (detect.contains(e.globalX, e.globalY)) return;
            this.moveLeft = false;
        }

        /** @type {Graphics} */
        this.rightRegion = this.add(new Graphics().rect(root.nativeResolution.x*(1-moveWidth), 0, root.nativeResolution.x*moveWidth, root.nativeResolution.y).fill(0x00ff00));
        this.rightRegion.alpha = daAlpha;
        this.rightRegion.eventMode = 'static';
        this.rightRegion.onpointerenter = e => {
            this.moveRight = true;
            this.moveLeft = false;
        };
        this.rightRegion.onpointerleave = e => {
            if (e.global.x > innerWidth) return;
            const detect = new Rectangle(innerWidth*(1-moveWidth), 0, innerWidth*moveWidth, innerHeight);
            if (detect.contains(e.globalX, e.globalY)) return;
            this.moveRight = false;
        };
        
    }

    /** @param {Ticker} ticker  */
    static movement(ticker) {
        if (this.moveLeft && Office.container.x < Office.margin) {
            Office.container.x += root.nativeResolution.x * this.movePercentage * ticker.deltaTime
        }

        if (this.moveRight && Office.container.x > -Office.margin) {
            Office.container.x -= root.nativeResolution.x * this.movePercentage * ticker.deltaTime
        }
    }

    /** @param {Ticker} ticker  */
    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (Tools.camUp) return;
        this.movement(ticker);
    }
}