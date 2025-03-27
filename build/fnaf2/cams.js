import { Graphics, Sprite, Text } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import GameAssets from "./assets";
import Game from "./game";
import Office from "./office";

export default class Cams extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.container.visible = false;

        this.utilssheet = await SpriteLoader.loadSheet('camutils');
        this.stage = await SpriteLoader.loadSheet('stage');
        this.mainhall = await SpriteLoader.loadSheet('mainhall');
        this.partsservices = await SpriteLoader.loadSheet('partsservices');

        /** @type {Sprite} */
        this.sprite = this.add(new Sprite(this.stage.textures['117.png']));
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.sprite.scale.x = 1.2;
        this.sprite.filters = [Office.fake3d];

        /** @type {Container} */
        this.static1Anim = this.add(await SpriteLoader.AnimatedSprite('static1', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.alpha = 0.5;
        }));
        this.static1Anim.playAnimation();

        /** @type {Container} */
        this.blipFlashAnim = this.add(await SpriteLoader.AnimatedSprite('blipflash', anim => {
            anim.loop = false;
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.onComplete = () => {this.blipFlashAnim.visible = false; anim.gotoAndStop(0)};
        }));
        this.blipFlashAnim.visible = false;

        /** @type {Sprite} */
        this.map = this.add(new Sprite(this.utilssheet.textures['Map.png']));
        this.map.scale = 1.5;
        this.map.position.set(root.nativeResolution.x-this.map.width-150, root.nativeResolution.y-this.map.height-150);

        /** @type {Text} */
        this.locationText = this.add(new Text({text: 'Show Stage', style: {fontSize: 72, fontFamily: GameAssets.fonts.fnaf.family, fill: 0xffffff}}));
        this.locationText.position.set(this.map.x, this.map.y-this.locationText.height);

        const borderOffset = 20;
        /** @type {Graphics} */
        this.border = this.add(new Graphics()
            .rect(0, 0, root.nativeResolution.x-borderOffset*2, root.nativeResolution.y-borderOffset*2)
            .stroke({fill: 0xffffff, width: 3})
        );
        this.border.position.set(borderOffset, borderOffset);

        this._09 = this.#makeButton('09', 520, 30, () => {
            this.locationText.text = 'Show Stage';
            if (false) {

            } else {
                this.sprite.texture = this.stage.textures['117.png'];
            }
        });
        this._10 = this.#makeButton('10', 410, 210, () => this.locationText.text = 'Game Area');
        this._11 = this.#makeButton('11', 570, 140, () => this.locationText.text = 'Prize Corner');
        this._12 = this.#makeButton('12', 520, 300, () => this.locationText.text = 'Kid\'s Cove');
        this._8 = this.#makeButton('08', 45, 70, () => {
            this.locationText.text = 'Parts/Services';
            this.locationText.text = 'Main Hall';
            if (false) {

            } else {
                this.sprite.texture = this.partsservices.textures['201.png'];
            }
        });
        this._7 = this.#makeButton('07', 275, 75, () => {
            this.locationText.text = 'Main Hall';
            if (false) {

            } else {
                this.sprite.texture = this.mainhall.textures['51.png'];
            }
        });
        this._6 = this.#makeButton('06', 225, 425, () => this.locationText.text = 'Right Air Vent');
        this._5 = this.#makeButton('05', 50, 425, () => this.locationText.text = 'Left Air Vent');
        this._4 = this.#makeButton('04', 100, 100, () => this.locationText.text = 'Party Room 4');
        this._3 = this.#makeButton('03', 100, 100, () => this.locationText.text = 'Party Room 3');
        this._2 = this.#makeButton('02', 100, 100, () => this.locationText.text = 'Party Room 2');
        this._1 = this.#makeButton('01', 100, 100, () => this.locationText.text = 'Party Room 1');

        this._currentButtonObject = this._09;
        this.buttonFlashGreenTimer = 0;

    }

    static updateCamsSprites() {
        if (Game.currentCam === '09') {

        }
    }

    static #makeButton(cam, x, y, callBack) {
        /** @type {Sprite} */
        const b = this.add(new Sprite(this.utilssheet.textures['16.png']));
        b.position.set(this.map.x+x, this.map.y+y);
        b.eventMode = 'static';
        b.callBack = () => {if (Game.currentCam === cam) callBack();}
        b.onpointerdown = e => {
            if (this._currentButtonObject === b || Game.currentCam === cam) return;
            Game.currentCam = cam;
            this.buttonFlashGreenTimer = 0;
            this._currentButtonObject.texture = this.utilssheet.textures['16.png'];
            this._currentButtonObject = b;
            this.blipFlashAnim.playAnimation(); this.blipFlashAnim.visible = true;
            GameAssets.audio.blip3.play();
            b.callBack();
        }
        /** @type {Text} */
        b.addChild(new Text({
            text: 'CAM\n'+cam, x: 7.5, y: 2.25,
            style: {fill: 0xffffff, fontFamily: GameAssets.fonts.fnaf.family, fontSize: 27, lineHeight: 13.5, letterSpacing: 2.5}
        }));
        b.scale = this.map.scale;
        return b;
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (!Game.container.visible) return;
        this.buttonFlashGreenTimer+=this.deltaTime;
        if (this.buttonFlashGreenTimer >= 0.5) {
            this.buttonFlashGreenTimer = -0.5;
            if (this._currentButtonObject.texture !== this.utilssheet.textures['16.png'])
                this._currentButtonObject.texture = this.utilssheet.textures['16.png'];
        } else if (this.buttonFlashGreenTimer >= 0) {
            if (this._currentButtonObject.texture !== this.utilssheet.textures['17.png'])
                this._currentButtonObject.texture = this.utilssheet.textures['17.png'];
        }
    }
}