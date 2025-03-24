import {Sprite, Spritesheet, AnimatedSprite, Container} from 'pixi.js';
import GameAssets from '../fnaf2/assets';

export default class SpriteLoader {
    static async Sprite(src) {
        class ExtendedSprite extends Sprite {
            constructor(sheet) {
                super(sheet.textures[Object.keys(sheet.textures)[0]]);
                this.spritesheet = sheet;
            }
            
            swapTexture(key) { this.texture = this.spritesheet.textures[key]; }
        }
        return new ExtendedSprite(await this.loadSheet(src));
    }

    static async SpriteCollection(src, callBack) {
        const sheet = await this.loadSheet(src);
        sheet.sprites = {};
        for (const [key, value] of Object.entries(sheet.textures)) {
            sheet.sprites[key] = new Sprite(value);
            if (callBack !== undefined) callBack(sheet.sprites[key]);
        }
        sheet.forEach = cb => {for (const sprite of Object.values(sheet.sprites)) cb(sprite);}
        return sheet;
    }

    static async AnimatedSprite(src, callBack) {
        class ExtendedAnimatedSprite extends Container {
            constructor(sheet) {
                super();
                this.spritesheet = sheet;
                this.animations = {};
                for (const [key, value] of Object.entries(this.spritesheet.animations)) {
                    this.animations[key] = new AnimatedSprite(value);
                    this.addChild(this.animations[key]);
                    if (callBack !== undefined || callBack !== null) callBack(this.animations[key]);
                }
                this.currentAnimation = this.animations[Object.keys(this.animations)[0]];
                this.changeAnimation(this.currentAnimation);
            }

            forEach(callBack) {
                for (const anim of Object.values(this.animations)) {
                    callBack(anim);
                }
            }

            changeAnimation(key) {
                for (const [string, animation] of Object.entries(this.animations)) {
                    animation.visible = false;
                    if (key === string || key === animation) {animation.visible = true; this.currentAnimation = animation;}
                }
            }

            playAnimation(key) {
                if (key == undefined || key == null || key == '') {
                    this.animations[Object.keys(this.animations)[0]].gotoAndPlay(0);
                } else {
                    this.changeAnimation(key);
                    this.animations[key].gotoAndPlay(0);
                }
            }

            resetAnimations() {
                this.forEach( ([key, animation]) => {
                    animation.gotoAndStop(0);
                })
            }
        }
        return new ExtendedAnimatedSprite(await this.loadSheet(src))
    }

    static async loadSheet(alias) {
        const json = GameAssets[alias].spjson;
        const spritesheet =  new Spritesheet(GameAssets[alias].spritesheet, json.data);
        await spritesheet.parse();
        return spritesheet;
    }
}