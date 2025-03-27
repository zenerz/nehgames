import VisualAspect from "../common/visualaspect";
import { Sprite } from "pixi.js";
import GameAssets from "./assets";
import SpriteLoader from "../common/spriteloader";
import Game from "./game";
import Cams from "./cams";
import Tools from "./tools";

export default class UI extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        const bScale = {x: 1.8, y: 1.4};

        /** @type {Sprite} */
        this.maskButton = this.add(new Sprite(GameAssets.usebuttons.mask));
        this.maskButton.scale.set(bScale.x, bScale.y);
        this.maskButton.position.set(Cams.border.x+10, Cams.border.y+Cams.border.height-this.maskButton.height-20);
        this.maskButton.eventMode = 'static';
        this.maskButton.onpointerenter = e => {
            if (Tools.freddyMask.currentAnimation.playing || Tools.tablet.currentAnimation.playing) return;
            if (!Game.maskOn && !Game.camUp) {
                Game.maskOn = true;
                Tools.freddyMask.playAnimation('on');
                Tools.freddyMask.animations.off.gotoAndStop(0);
                Tools.freddyMask.visible = true;
                GameAssets.audio.freddymask1.play();
                this.camsButton.visible = false;
            } else if (Game.maskOn) {
                Game.maskOn = false;
                Tools.freddyMask.position.set(root.nativeResolution.x/2, root.nativeResolution.y/2);
                Tools.freddyMask.playAnimation('off');
                Tools.freddyMask.animations.on.gotoAndStop(0);
                GameAssets.audio.freddymask2.play();
                GameAssets.audio.deepbreaths.stop();
            }
        }

        /** @type {Sprite} */
        this.camsButton = this.add(new Sprite(GameAssets.usebuttons.cams));
        this.camsButton.scale.set(bScale.x, bScale.y);
        this.camsButton.position.set(this.maskButton.x + this.maskButton.width, this.maskButton.y);
        this.camsButton.eventMode = 'static';
        this.camsButton.onpointerenter = e => {
            if (Tools.tablet.currentAnimation.playing) return;
            if (!Game.maskOn && !Game.camUp) {
                Tools.tablet.playAnimation('up');
                Tools.tablet.visible = true;
                GameAssets.audio.camflip1.play();
            } else if (Game.camUp) {
                Game.camUp = false; Cams.container.visible = false;
                Tools.tablet.playAnimation('down');
                GameAssets.audio.camflip2.play();
            }
        }

        Tools.freddyMask.animations.on.onComplete = () => GameAssets.audio.deepbreaths.play({loop: true});
        Tools.freddyMask.animations.off.onComplete = () => {
            Tools.freddyMask.visible = false;
            this.camsButton.visible = true;
        }

        Tools.tablet.animations.down.onComplete = () => Tools.tablet.visible = false;
        Tools.tablet.animations.up.onComplete = () => {
            Game.camUp = true; Cams.container.visible = true;
        }

        /** @type {Sprite} */
        this.flashlightBatteryIcon = this.add(await SpriteLoader.Sprite('flashlightbatteryicon'));
        this.flashlightBatteryIcon.scale = 1.25;
        this.flashlightBatteryIcon.position.set(Cams.border.x, Cams.border.y);
    }
}