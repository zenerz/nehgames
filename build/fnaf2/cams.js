import { Graphics, Sprite, Text } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import GameAssets from "./assets";
import Game from "./game";
import Office from "./office";
import { ToyChica } from "./animatronic";

export default class Cams extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.container.visible = false;

        this.utilssheet = await SpriteLoader.loadSheet('camutils');
        this.musicbox = await SpriteLoader.loadSheet('musicbox');

        this.stage = await SpriteLoader.loadSheet('stage');
        this.gamearea = await SpriteLoader.loadSheet('gamearea');
        this.prizecorner = await SpriteLoader.loadSheet('prizecorner');
        this.mainhall = await SpriteLoader.loadSheet('mainhall');
        this.partsservices = await SpriteLoader.loadSheet('partsservices');
        this.partyroom4 = await SpriteLoader.loadSheet('partyroom4');
        this.partyroom3 = await SpriteLoader.loadSheet('partyroom3');
        this.partyroom2 = await SpriteLoader.loadSheet('partyroom2');
        this.partyroom1 = await SpriteLoader.loadSheet('partyroom1');

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

        /** @type {Sprite} */
        this.windMusicBoxButton = this.add(new Sprite(this.utilssheet.textures['16.png']));
        this.windMusicBoxButton.visible = false;
        this.windMusicBoxButton.eventMode = 'static';
        this.windMusicBoxButton.position.set(root.nativeResolution.x*0.25, root.nativeResolution.y*0.75);
        this.windMusicBoxButton.scale.y = 2; this.windMusicBoxButton.scale.x = 5; 
        this.windMusicBoxButton.addChild(new Text({text: 'WIND\nMUSIC\nBOX', x: 7.5, y: 2.25, scale: 0.725,
            style: {fill: 0xffffff, fontFamily: GameAssets.fonts.fnaf.family, fontSize: 27, lineHeight: 13.5, letterSpacing: 2.5}
        }));
        this.windMusicBoxButton.onpointerdown = e => {
            this.windMusicBoxButton.texture = this.utilssheet.textures['17.png'];
            Game.musicBoxWinding = true;
            if (!GameAssets.audio.windup2.isPlaying) GameAssets.audio.windup2.play({loop: true});
        }
        this.windMusicBoxButton.onpointerup = e => {
            this.windMusicBoxButton.texture = this.utilssheet.textures['16.png'];
            Game.musicBoxWinding = false;
            if (GameAssets.audio.windup2.isPlaying) GameAssets.audio.windup2.stop();
        }
        this.windMusicBoxButton.onpointerleave = e => { this.windMusicBoxButton.onpointerup(); }

        /** @type {Sprite} */
        this.musicBoxCircle = this.add(new Sprite(Object.values(this.musicbox.textures)[Object.values(this.musicbox.textures).length-1]));
        this.musicBoxCircle.scale = 1.75;
        this.musicBoxCircle.position.set(this.windMusicBoxButton.x-this.musicBoxCircle.width-this.musicBoxCircle.width*0.11, this.windMusicBoxButton.y);

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
            if (Game.locationMap.locations.get('09').entities.length === 1) {
                this.sprite.texture = this.stage.textures['178.png'];
            } else if ((Game.locationMap.locations.get('09').entities.length === 2)) {
                this.sprite.texture = this.stage.textures['176.png'];
            } else {
                this.sprite.texture = this.stage.textures['117.png'];
            }
        });
        this._10 = this.#makeButton('10', 410, 210, () => {
            this.locationText.text = 'Game Area'
            if (false) {

            } else {
                this.sprite.texture = this.gamearea.textures['41.png'];
            }
        });
        this._11 = this.#makeButton('11', 570, 140, () => {
            this.locationText.text = 'Prize Corner'
            if (false) {

            } else {
                this.sprite.texture = this.prizecorner.textures['76.png'];
            }
        });
        this._12 = this.#makeButton('12', 520, 300, () => {
            this.locationText.text = 'Kid\'s Cove'
        });
        this._8 = this.#makeButton('08', 45, 70, () => {
            this.locationText.text = 'Parts/Services';
            if (false) {

            } else {
                this.sprite.texture = this.partsservices.textures['201.png'];
            }
        });
        this._7 = this.#makeButton('07', 275, 75, () => {
            this.locationText.text = 'Main Hall';
            if (Game.locationMap.locations.get('07').entities[0] instanceof ToyChica) {
                this.sprite.texture = this.mainhall.textures['440.png'];
            } else {
                this.sprite.texture = this.mainhall.textures['51.png'];
            }
        });
        this._6 = this.#makeButton('06', 225, 425, () => this.locationText.text = 'Right Air Vent');
        this._5 = this.#makeButton('05', 50, 425, () => this.locationText.text = 'Left Air Vent');
        this._4 = this.#makeButton('04', 250, 200, () => {
            this.locationText.text = 'Party Room 4'
            if (false) {

            } else {
                this.sprite.texture = this.partyroom4.textures['43.png'];
            }
        });
        this._3 = this.#makeButton('03', 25, 200, () => {
            this.locationText.text = 'Party Room 3'
            if (false) {

            } else {
                this.sprite.texture = this.partyroom3.textures['82.png'];
            }
        });
        this._2 = this.#makeButton('02', 250, 300, () => {
            this.locationText.text = 'Party Room 2'
            if (false) {

            } else {
                this.sprite.texture = this.partyroom2.textures['80.png'];
            }
        });
        this._1 = this.#makeButton('01', 25, 300, () => {
            this.locationText.text = 'Party Room 1'
            if (false) {

            } else {
                this.sprite.texture = this.partyroom1.textures['174.png'];
            }
        });

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
        if (Game.camUp && Game.currentCam === '11') {
            if (!this.windMusicBoxButton.visible) this.windMusicBoxButton.visible = true;
            if (!this.musicBoxCircle.visible) this.musicBoxCircle.visible = true;
            if (GameAssets.audio.musicbox.paused) GameAssets.audio.musicbox.resume();
            else if (!GameAssets.audio.musicbox.isPlaying) GameAssets.audio.musicbox.play();
        } else {
            if (this.windMusicBoxButton.visible) this.windMusicBoxButton.visible = false;
            if (this.musicBoxCircle.visible) this.musicBoxCircle.visible = false;
            if (GameAssets.audio.musicbox.isPlaying) GameAssets.audio.musicbox.pause();
        }
        this.buttonFlashGreenTimer+=this.deltaTime;
        if (this.buttonFlashGreenTimer >= 0.5) {
            this.buttonFlashGreenTimer = -0.5;
            if (this._currentButtonObject.texture !== this.utilssheet.textures['16.png'])
                this._currentButtonObject.texture = this.utilssheet.textures['16.png'];
        } else if (this.buttonFlashGreenTimer >= 0) {
            if (this._currentButtonObject.texture !== this.utilssheet.textures['17.png'])
                this._currentButtonObject.texture = this.utilssheet.textures['17.png'];
        }

        if (Game.musicBoxProgress > 0) {
            this.musicBoxCircle.texture = Object.values(this.musicbox.textures)[Math.round(Game.musicBoxProgress/5)];
        } else this.musicBoxCircle.texture = null;
        

    }
}