import { Sprite } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import Office from "./office";

export default class LightsButtons extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.bScale = 1.5;

        /** @type {Sprite} */
        this.leftSprite = this.add(await SpriteLoader.Sprite('lightsbuttons'));
        this.leftSprite.swapTexture('91.png');
        this.leftSprite.scale = this.bScale;
        this.leftSprite.position.set(-Office.margin+175, root.nativeResolution.y/2-45);

        /** @type {Sprite} */
        this.rightSprite = this.add(await SpriteLoader.Sprite('lightsbuttons'));
        this.rightSprite.swapTexture('94.png');
        this.rightSprite.position.set(Office.sprite.width-Office.margin-this.rightSprite.width-210, root.nativeResolution.y/2-45)
        this.rightSprite.scale = this.bScale;
    }
}