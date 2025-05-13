import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import { Graphics, Text } from "pixi.js";
import GameAssets from "./assets";
import MainMenu from "./mainmenu";
import Game from "./game";

export default class Screens extends VisualAspect {
    static async init(root) {
        super.init(root);

        this.transition = false;
        this.readwaittimer = 0;
        this.intermissionwait = 0;

        this.sprite = this.add(await SpriteLoader.Sprite('screens'));
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.sprite.visible = false;

        this.static1Anim = this.add(await SpriteLoader.AnimatedSprite('static1', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.5;
        }));
        this.static1Anim.visible = false;

        this.blackBox = this.add(new Graphics().rect(0, 0, root.nativeResolution.x, root.nativeResolution.y).fill(0x000000));
        this.blackBox.visible = false;

        this.gameOverText = this.add(new Text({text: 'Game Over', style: {fontFamily: 'Ocrastd', fill: 0xff0000, fontSize: 100}}));
        this.gameOverText.visible = false;

        this.intermissionText = this.add(new Text({
            text: '12:00 AM\n1st Night', x: root.nativeResolution.x/2-150, y: root.nativeResolution.y/2-100,
            style: {fontFamily: 'Ocrastd', fill: 0xffffff, fontSize: 50, align: 'center', lineHeight: 80}
        }));
        this.intermissionText.visible = false;

        this.blipFlashAnim = this.add(await SpriteLoader.AnimatedSprite('blipflash', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.33;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.onComplete = () => {anim.visible = false; anim.gotoAndStop(0)};
        }));
        this.blipFlashAnim.visible = false;
    }

    static reset() {
        this.sprite.visible = false;
        this.static1Anim.visible = false;
        this.static1Anim.resetAnimations();
        this.gameOverText.visible = false;
        this.blackBox.visible = false;
        this.intermissionText.visible = false;
    }

    static gameOverScreen() {
        this.sprite.visible = true;
        this.sprite.swapTexture('227.png');
        this.static1Anim.playAnimation();
        this.static1Anim.visible = true;
        this.gameOverText.visible = true;
    }

    static newGameScreen() {
        if (this.transition) return;
        this.sprite.swapTexture('273.png');
        this.transition = true;
        this.sprite.visible = true;
        this.sprite.alpha = 0;
        this.blackBox.visible = true;
        this.blackBox.alpha = 0;
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);

        if (this.transition) {
            if (this.sprite.alpha < 1) this.sprite.alpha += this.deltaTime/3;
            if (this.sprite.alpha >= 1) {
                this.readwaittimer+=this.deltaTime;
                if (this.readwaittimer >= 4) {
                    this.blackBox.alpha += this.deltaTime/2;
                    if (this.blackBox.alpha >= 1) {
                        this.intermissionwait+=this.deltaTime;
                        if (!this.blipFlashAnim.currentAnimation.playing) this.blipFlashAnim.playAnimation();
                        if (GameAssets.audio.bgmusic.isPlaying) GameAssets.audio.bgmusic.stop();
                        this.blipFlashAnim.visible = true;
                        this.intermissionText.visible = true;
                        if (this.intermissionwait > 1) {
                            this.transition = false;
                            MainMenu.container.visible = false;
                            Game.start({});
                            Screens.reset();
                        }
                    }
                }
            }
        }

    }
}