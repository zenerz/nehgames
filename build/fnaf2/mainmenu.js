import { Container, Text } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import root from "./rootcontainer";
import { FancyButton } from "@pixi/ui";

export default class MainMenu {
    static async init() {
        this.container = new Container();

        this.bgSprites = await SpriteLoader.SpriteCollection('titlescreen', sprite => sprite.setSize(root.nativeResolution.x, root.nativeResolution.y) );
        this.bgImage = this.container.addChild(this.bgSprites.sprites['322.png']);

        this.static1Anim = this.container.addChild(await SpriteLoader.AnimatedSprite('static1', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.5;
        }));
        this.static1Anim.playAnimation();

        this.title = this.container.addChild(new Text({text: 'Five\nNight\'s\nat\nFreddy\'s 2', x: 50, y: 50, style: {fill: 0xffffff, fontSize: 100}}));

        //
        this.newGame = this.container.addChild(new FancyButton({
            defaultView: new Text({text: 'New Game', style: {fill: 0xffffff, fontSize: 64}}),
            hoverView: new Text({text: '>> New Game', style: {fill: 0xffffff, fontSize: 64}}),
        }));
        this.newGame.position.set(this.title.x, this.title.y+this.title.height+100);
        //
        this.continueGame = this.container.addChild(new FancyButton({
            defaultView: new Text({text: 'Continue', style: {fill: 0xffffff, fontSize: 64}}),
            hoverView: new Text({text: '>> Continue', style: {fill: 0xffffff, fontSize: 64}}),
        }));
        this.continueGame.position.set(this.newGame.x, this.newGame.y+this.newGame.height+10);
        //
        this.customNight = this.container.addChild(new FancyButton({
            defaultView: new Text({text: 'Customize Night', style: {fill: 0xffffff, fontSize: 64}}),
            hoverView: new Text({text: '>> Customize Night', style: {fill: 0xffffff, fontSize: 64}}),
        }));
        this.customNight.position.set(this.continueGame.x, this.continueGame.y+this.continueGame.height+10);
    }
}