import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import GameAssets from "./assets";
import { Container, Sprite } from "pixi.js";

export default class Tools extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.camUp = false;
        this.maskOn = false;

        /** @type {Container} */
        this.freddyMask = this.add(await SpriteLoader.AnimatedSprite('freddymask', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.5;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
        }));
        this.freddyMask.visible = false;
        this.freddyMask.animations.off.onComplete = () => this.freddyMask.visible = false;

        /** @type {Container} */
        this.tablet = this.add(await SpriteLoader.AnimatedSprite('tablet', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.5;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
        }));
        this.tablet.visible = false;
        this.tablet.animations.down.onComplete = () => this.tablet.visible = false;
        

        /** @type {Sprite} */
        this.maskButton = this.add(new Sprite(GameAssets.usebuttons.mask));
        this.maskButton.scale.x = 1.5;
        this.maskButton.position.set(root.nativeResolution.x/10, root.nativeResolution.y-this.maskButton.height-20);
        this.maskButton.eventMode = 'static';
        this.maskButton.onpointerenter = e => {
            if (this.freddyMask.currentAnimation.playing) return;
            if (!this.maskOn && !this.camUp) {
                this.maskOn = true;
                this.freddyMask.playAnimation('on');
                this.freddyMask.visible = true;
                GameAssets.audio.freddymask1.play();
            } else if (this.maskOn) {
                this.maskOn = false;
                this.freddyMask.playAnimation('off');
                GameAssets.audio.freddymask2.play();
            }
        }

        /** @type {Sprite} */
        this.camsButton = this.add(new Sprite(GameAssets.usebuttons.cams));
        this.camsButton.scale.x = 1.5;
        this.camsButton.position.set(this.maskButton.x + this.maskButton.width, this.maskButton.y);
        this.camsButton.eventMode = 'static';
        this.camsButton.onpointerenter = e => {
            if (this.tablet.currentAnimation.playing) return;
            if (!this.maskOn && !this.camUp) {
                this.camUp = true;
                this.tablet.playAnimation('up');
                this.tablet.visible = true;
                GameAssets.audio.camflip1.play();
            } else if (this.camUp) {
                this.camUp = false;
                this.tablet.playAnimation('down');
                GameAssets.audio.camflip2.play();
            }
        }
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);

    }
}