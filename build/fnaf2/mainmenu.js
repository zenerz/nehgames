import { Container, Graphics, Sprite, Text } from "pixi.js";
import VisualAspect from "../common/visualaspect";
import SpriteLoader from "../common/spriteloader";
import root from "./rootcontainer";
import { FancyButton } from "@pixi/ui";
import Screens from "./screens";
import Game from "./game";

export default class MainMenu extends VisualAspect {
    static async init(root) {
        super.init(root);
        
        /** @type {Sprite} */
        this.bgImage = this.add(await SpriteLoader.Sprite('titlescreen'));
        this.bgImage.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.bgImage.swapTexture('322.png');

        /** @type {Container} */
        this.static1Anim = this.add(await SpriteLoader.AnimatedSprite('static1', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.5;
        }));
        this.static1Anim.playAnimation();

        /** @type {Container} */
        this.blipFlashAnim = this.add(await SpriteLoader.AnimatedSprite('blipflash', anim => {
            anim.loop = false;
            anim.animationSpeed = 0.066;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.25;
            anim.onComplete = () => {anim.visible = false; anim.gotoAndStop(0)};
        }));
        this.blipFlashAnim.currentAnimation.visible = false;

        /** @type {Graphics} */
        this.movingrect = this.add(new Graphics().rect(0, 0, root.nativeResolution.x, 80).fill(0xffffff));
        this.movingrect.alpha = 0.25;

        /** @type {Text} */
        this.title = this.add(new Text({text: 'Five\nNight\'s\nat\nFreddy\'s\n2', x: 50, y: 50, style: {fill: 0xffffff, fontSize: 100, fontFamily: 'Ocrastd',}}));

        //
        const style = {fill:0xffffff, fontFamily: 'Ocrastd', fontSize: 64};

        /** @type {FancyButton} */
        this.newGame = this.add(new FancyButton({
            defaultView: new Text({text: 'New Game', style: style}),
            hoverView: new Text({text: '>> New Game', style: style}),
        }));
        this.newGame.position.set(this.title.x, this.title.y+this.title.height+100);
        this.newGame.button.onPress.connect(e => {
            Screens.newGameScreen();
        });
        //
        /** @type {FancyButton} */
        this.continueGame = this.add(new FancyButton({
            defaultView: new Text({text: 'Continue', style: style}),
            hoverView: new Text({text: '>> Continue', style: style}),
        }));
        this.continueGame.position.set(this.newGame.x, this.newGame.y+this.newGame.height+10);
        this.continueGame.button.onPress.connect(e => {
            if (Screens.transition) return;
            Game.start({});
        })
        //
        /** @type {FancyButton} */
        this.customNight = this.add(new FancyButton({
            defaultView: new Text({text: 'Customize Night', style: style}),
            hoverView: new Text({text: '>> Customize Night', style: style}),
        }));
        this.customNight.position.set(this.continueGame.x, this.continueGame.y+this.continueGame.height+10);
        this.customNight.button.onPress.connect(e => {
            
        })

        this.titleswaptimer = 0;
        this.blipflashintervaltimer = 0;
        this.statictimer = 0;

    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);

        if (Screens.transition) {
            this.static1Anim.currentAnimation.stop();
            this.blipFlashAnim.currentAnimation.stop();
            return;
        }

        this.titleswaptimer += this.deltaTime;
        if (!this.blipFlashAnim.currentAnimation.playing) this.blipflashintervaltimer += this.deltaTime;
        this.statictimer += this.deltaTime;

        if (this.statictimer > 0.25) {
            this.statictimer = 0;
            const possible = [0.33, 0.55, 0.77, 0.88];
            this.static1Anim.currentAnimation.alpha = possible[Math.floor(Math.random()*possible.length)];
        }

        if (this.titleswaptimer > 0.5) {
            const ar = Object.keys(this.bgImage.spritesheet.textures)
            const key = ar[Math.floor(Math.random()*ar.length)];
            this.bgImage.swapTexture(key);
            this.titleswaptimer = -0.1;
        } else if (this.titleswaptimer >= 0) {
            this.bgImage.swapTexture('322.png');
        }

        if (this.blipflashintervaltimer >= (1+this.blipFlashAnim.currentAnimation.totalFrames/60)/(this.blipFlashAnim.currentAnimation.animationSpeed*10)) {
            this.blipFlashAnim.playAnimation();
            this.blipFlashAnim.forEach(a => a.visible = true);
            this.blipflashintervaltimer = 0;
        }

        if (this.movingrect.y < root.nativeResolution.y + this.movingrect.height) {
            this.movingrect.y += 2 * ticker.deltaTime;
        } else {
            this.movingrect.y = 0 - this.movingrect.height;
        }
    }
}