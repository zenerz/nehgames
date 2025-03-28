import { Sprite } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import Office from "./office";
import Game from "./game";

export default class LightsButtons extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.bScale = 1.5;

        /** @type {Sprite} */
        this.leftSprite = this.add(await SpriteLoader.Sprite('lightsbuttons'));
        this.leftSprite.swapTexture('91.png');
        this.leftSprite.scale = this.bScale;
        this.leftSprite.position.set(-Office.margin+175, root.nativeResolution.y/2-40);
        this.leftSprite.eventMode = 'static';
        this.leftSprite.onpointerdown = e => {
            if (Game.flashLightOn) return;
            Game.leftVentLightOn = true;
            Office.updateSprite();
        }
        this.leftSprite.onpointerup = e => {
            if (Game.flashLightOn) return;
            Game.leftVentLightOn = false;
            Office.updateSprite();
        }
        this.leftSprite.onpointerleave = e => {
            Game.leftVentLightOn = false;
            Office.updateSprite();
        }

        /** @type {Sprite} */
        this.rightSprite = this.add(await SpriteLoader.Sprite('lightsbuttons'));
        this.rightSprite.swapTexture('99.png');
        this.rightSprite.position.set(Office.sprite.width-Office.margin-this.rightSprite.width-210, root.nativeResolution.y/2-40)
        this.rightSprite.scale = this.bScale;
        this.rightSprite.eventMode = 'static';
        this.rightSprite.onpointerdown = e => {
            if (Game.flashLightOn) return;
            Game.rightVentLightOn = true;
            Office.updateSprite();
        }
        this.rightSprite.onpointerup = e => {
            if (Game.flashLightOn) return;
            Game.rightVentLightOn = false;
            Office.updateSprite();
        }
        this.rightSprite.onpointerleave = e => {
            Game.rightVentLightOn = false;
            Office.updateSprite();
        }
    }
}