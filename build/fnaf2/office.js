import { AnimatedSprite, Container, Filter, GlProgram, Graphics, Rectangle, Sprite, Ticker } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import root from "./rootcontainer";
import GameAssets from "./assets";
import LightsButtons from "./lightsbuttons";
import Game from "./game";
import ToyBonnie from "./animatronics/toybonnie";
import ToyChica from "./animatronics/toychica";
import ToyFreddy from "./animatronics/toyfreddy";

export default class Office extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);
        
        /** @type {Sprite} */
        this.sprite = this.add(await SpriteLoader.Sprite('office'));
        this.sprite.swapTexture('93.png');
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.sprite.anchor.x = 0.5;
        this.sprite.x = root.nativeResolution.x/2;
        this.sprite.scale.x = 1.75;

        this.margin = (this.sprite.width-this.sprite.width/this.sprite.scale.x)/(this.sprite.scale.x+1);

        const insideofficesheet = await SpriteLoader.loadSheet('insideoffice');
        this.toyfreddy = this.add(new Sprite(insideofficesheet.textures['512.png']));
        this.toyfreddy.scale = 1.4;
        this.toyfreddy.position.set(root.nativeResolution.x/2, root.nativeResolution.y-this.toyfreddy.height);
        this.toyfreddy.visible = false;

        this.toybonnie = this.add(new Sprite(insideofficesheet.textures['187.png']));
        this.toybonnie.visible = false;

        /** @type {Container} */
        this.desk = this.add(await SpriteLoader.AnimatedSprite('desk', anim => {
            anim.anchor.x = 0.5;
        }));
        this.desk.playAnimation();
        this.desk.scale = 1.33;
        this.desk.position.set(root.nativeResolution.x/2+200, root.nativeResolution.y-this.desk.height);

        /** @type {Graphics} */
        this.blackoutBox = this.add(new Graphics().rect(0, 0, this.sprite.width*1.5, this.sprite.width).fill(0x000000));
        this.blackoutBox.pivot.x = this.sprite.width/2;
        this.blackoutBox.visible = false;
        this.blackoutFlashTime = 0;
        this.blackoutElapsed = 0;
        this.blackoutFullWait = 0;

        /** @type {Filter} */
        this.fake3d = new Filter({
            glProgram: new GlProgram({
                vertex: GameAssets.fake3dshader.vert, fragment: GameAssets.fake3dshader.frag
            }),
            resources: {
                timeUniforms: {
                    uScaleX: {value: 1, type: 'f32'},
                    uScaleY: {value: 1, type: 'f32'},
                }
            }
        });

        this.container.filters = [this.fake3d];

        await LightsButtons.init(root, this.container);
    }

    static updateSprite() {
        this.toyfreddy.visible = false;
        if (Game.locationMap && Game.locationMap.locations.get('Office').entities.length > 0) {
            if (Game.locationMap.locations.get('Office').entities[0] instanceof ToyFreddy) {
                this.sprite.swapTexture('93.png');
                this.toyfreddy.visible = true;
            } else {

            }
        } else if (Game.flashLightOn) {
            if (Game.locationMap.locations.get('Office Hall Close').entities.length > 0) {
                if (Game.locationMap.locations.get('Office Hall Close').entities[0] instanceof ToyFreddy) {
                    this.sprite.swapTexture('194.png');
                }
            } else if (Game.locationMap.locations.get('Office Hall Far').entities[0] instanceof ToyChica) {
                this.sprite.swapTexture('184.png');
            } else if (Game.locationMap.locations.get('Office Hall Far').entities[0] instanceof ToyFreddy) {
                this.sprite.swapTexture('193.png');
            } else {
                this.sprite.swapTexture('124.png');
            }
        }
        else if (Game.rightVentLightOn || Game.leftVentLightOn) {
            if (Game.rightVentLightOn) {
                LightsButtons.rightSprite.swapTexture('94.png');
                if (Game.locationMap.locations.get('Right Vent').entities[0] instanceof ToyBonnie) {
                    this.sprite.swapTexture('181.png');
                } else if (false) {

                } else this.sprite.swapTexture('169.png');
            } 
            if (Game.leftVentLightOn) {
                LightsButtons.leftSprite.swapTexture('92.png');
                if (Game.locationMap.locations.get('Left Vent').entities[0] instanceof ToyChica) {
                    this.sprite.swapTexture('181.png');
                } else if (false) {

                } else this.sprite.swapTexture('167.png');
            }
        } else {
            this.sprite.swapTexture('93.png');
            LightsButtons.rightSprite.swapTexture('99.png');
            LightsButtons.leftSprite.swapTexture('91.png');
        }
    }

    static blackoutSequence() {
        Game.blackout = true;
        if (!GameAssets.audio.stare.isPlaying)
            GameAssets.audio.stare.play();
        this.blackoutFlashTime = 0;
        this.blackoutElapsed = 0;
        this.blackoutFullWait = 0;
        this.blackoutBox.alpha = 1;
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (Game.blackout) {
            this.blackoutElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            this.blackoutFlashTime += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.blackoutFlashTime >= 0.2 && this.blackoutElapsed < 2.0) {
                this.blackoutBox.visible = Math.floor(Math.random()*2) === 0 ? true : false;
            }
            if (this.blackoutElapsed >= 2.0) {
                this.blackoutBox.visible = true;
                this.blackoutFullWait += (1/ticker.maxFPS) * ticker.deltaTime;
                if (this.blackoutFullWait >= 1.0 && this.blackoutBox.alpha > 0) {
                    Game.blackout = false;
                    Office.updateSprite();
                    this.blackoutBox.alpha -= 0.1 * this.deltaTime;
                }
                if (this.blackoutBox.alpha <= 0) this.blackoutBox.visible = false;
            }
        } else {
            if (this.blackoutBox.visible) this.blackoutBox.visible = false;
            if (GameAssets.audio.stare.isPlaying) GameAssets.audio.stare.stop();
        }
    }
}