import { Graphics, Ticker } from "pixi.js";
import VisualAspect from "../common/visualaspect";
import Office from "./office";
import root from "./rootcontainer";

export default class OfficeMovement extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);
        const daAlpha = 0.25;
        this.movePercentage = 0.015;
        this.moveLeft, this.moveRight = false;

        /** @type {Graphics} */
        this.leftRegion = this.add(new Graphics().rect(0, 0, root.nativeResolution.x*0.375, root.nativeResolution.y).fill(0xffff00));
        this.leftRegion.alpha = daAlpha;
        this.leftRegion.eventMode = 'static';
        this.leftRegion.onpointerenter = e => {
            this.moveLeft = true;
            this.moveRight = false;
        };
        this.leftRegion.onpointerleave = e => {
            this.moveLeft = false;
        }

        /** @type {Graphics} */
        this.rightRegion = this.add(new Graphics().rect(root.nativeResolution.x*0.625, 0, root.nativeResolution.x*0.375, root.nativeResolution.y).fill(0x00ff00));
        this.rightRegion.alpha = daAlpha;
        this.rightRegion.eventMode = 'static';
        this.rightRegion.onpointerenter = e => {
            this.moveRight = true;
            this.moveLeft = false;
        };
        this.rightRegion.onpointerleave = e => {
            if (e.global.x < 0) return;
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
        this.movement(ticker);
    }
}