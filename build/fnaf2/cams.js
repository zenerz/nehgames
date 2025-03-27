import { Graphics, Sprite, Text } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import GameAssets from "./assets";

export default class Cams extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.container.visible = false;

        this.utilssheet = await SpriteLoader.loadSheet('camutils');
        this.stage = await SpriteLoader.loadSheet('stage');
        this.mainhall = await SpriteLoader.loadSheet('mainhall');

        /** @type {Sprite} */
        this.sprite = this.add(new Sprite(this.stage.textures['117.png']));
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);

        /** @type {Container} */
        this.static1Anim = this.add(await SpriteLoader.AnimatedSprite('static1', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.5;
        }));
        this.static1Anim.playAnimation();

        /** @type {Sprite} */
        this.map = this.add(new Sprite(this.utilssheet.textures['Map.png']));
        this.map.scale = 1.5;
        this.map.position.set(root.nativeResolution.x-this.map.width-100, root.nativeResolution.y-this.map.height-110);

        const borderOffset = 20;
        /** @type {Graphics} */
        this.border = this.add(new Graphics()
            .rect(0, 0, root.nativeResolution.x-borderOffset*2, root.nativeResolution.y-borderOffset*2)
            .stroke({fill: 0xffffff, width: 3})
        );
        this.border.position.set(borderOffset, borderOffset);

        this._09 = this.#makeButton('09', 520, 30);
        this._10 = this.#makeButton('10', 410, 210);
        this._11 = this.#makeButton('11', 570, 140);
        this._12 = this.#makeButton('12', 520, 300);
        this._8 = this.#makeButton('08', 45, 70);
        this._7 = this.#makeButton('07', 275, 75);
        this._6 = this.#makeButton('06', 225, 425);
        this._5 = this.#makeButton('05', 50, 425);
        this._4 = this.#makeButton('04', 100, 100);
        this._3 = this.#makeButton('03', 100, 100);
        this._2 = this.#makeButton('02', 100, 100);
        this._1 = this.#makeButton('01', 100, 100);

    }

    static #makeButton(cam, x, y) {
        /** @type {Sprite} */
        const b = this.add(new Sprite(this.utilssheet.textures['16.png']));
        b.position.set(this.map.x+x, this.map.y+y);
        b.eventMode = 'static';
        b.onpointerdown = e => {

        }
        /** @type {Text} */
        b.addChild(new Text({
            text: 'CAM\n'+cam, x: 7.5, y: 5,
            style: {fill: 0xffffff, fontFamily: '\"Volter  28goldfish 29\"', fontSize: 15, lineHeight: 13}
        }));
        b.scale = this.map.scale;
        return b;
    }

    static updateLoop(ticker) {

    }
}