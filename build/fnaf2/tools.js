import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import { Container } from "pixi.js";
import Game from "./game";
import GameAssets from "./assets";
import Office from "./office";

export default class Tools extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        /** @type {Container} */
        this.freddyMask = this.add(await SpriteLoader.AnimatedSprite('freddymask', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.66;
            anim.setSize(root.nativeResolution.x*1.2, root.nativeResolution.y*1.2);
            anim.anchor = 0.5;
        }));
        this.freddyMask.visible = false;
        this.freddyMask.position.set(root.nativeResolution.x/2, root.nativeResolution.y/2);

        /** @type {Container} */
        this.tablet = this.add(await SpriteLoader.AnimatedSprite('tablet', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.77;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
        }));
        this.tablet.visible = false;

    }

    static updateLoop(ticker) {
        if (this.freddyMask.animations.on.currentFrame == this.freddyMask.animations.on.totalFrames-1) {
            this.freddyMask.x += (Math.random() * 90 - 45)/200 * ticker.deltaMS;
            this.freddyMask.y += (Math.random() * 90 - 45)/200 * ticker.deltaMS;
        }

        if (!Game.maskOn && !Game.blackout) {
            if (!(Game.rightVentLightOn || Game.leftVentLightOn)) {
                if (Game.keyControlls.getKeyStatus('ControlLeft')) {
                    if (!GameAssets.audio.buzzlight.isPlaying)
                        GameAssets.audio.buzzlight.play({loop: true});
                    Game.flashLightOn = true;
                } else {
                    GameAssets.audio.buzzlight.stop();
                    Game.flashLightOn = false;
                }
                if (!Game.camUp) Office.updateSprite();
            }
        }
    }
}