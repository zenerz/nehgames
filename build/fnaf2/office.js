import { AnimatedSprite, Container, Filter, GlProgram, Graphics, Rectangle, Sprite, Ticker } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import GameAssets from "./assets";
import LightsButtons from "./lightsbuttons";
import Game from "./game";
import { ToyFreddy, ToyBonnie, ToyChica } from "./animatronic";

export default class Office extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);

        this.officeSheet = await SpriteLoader.loadSheet('office');
        this.officeHallwaySheet = await SpriteLoader.loadSheet('officehallway');
        this.officeVentsSheet = await SpriteLoader.loadSheet('officevents');
        
        /** @type {Sprite} */
        this.sprite = this.add(new Sprite(this.officeSheet.textures['92.png']));
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.sprite.anchor.x = 0.5;
        this.sprite.x = root.nativeResolution.x/2;
        this.sprite.scale.x = 1.75;

        this.margin = (this.sprite.width-this.sprite.width/this.sprite.scale.x)/(this.sprite.scale.x+1);

        const insideofficesheet = await SpriteLoader.loadSheet('insideoffice');
        this.toyfreddy = this.add(new Sprite(insideofficesheet.textures['512.png']));
        this.toyfreddy.scale = 1.3;
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
        this.toybonnie.visible = false;
        if (Game.blackout) {
            if (Game.locationMap && Game.locationMap.locations.get('Office').entities.length > 0) {
                this.sprite.texture = this.officeSheet.textures['92.png'];
                if (Game.locationMap.locations.get('Office').entities[0] instanceof ToyFreddy) {
                    this.toyfreddy.visible = true;
                } else if (Game.locationMap.locations.get('Office').entities[0] instanceof ToyBonnie) {
                    this.toybonnie.visible = true;
                } else {

                }
            }
        } else if (Game.flashLightOn) {
            if (Game.locationMap.locations.get('Office Hall Close').entities.length > 0) {
                if (Game.locationMap.locations.get('Office Hall Close').entities[0] instanceof ToyFreddy) {
                    this.sprite.texture = this.officeHallwaySheet.textures['193.png'];
                }
            } else if (Game.locationMap.locations.get('Office Hall Far').entities[0] instanceof ToyChica) {
                this.sprite.texture = this.officeHallwaySheet.textures['183.png'];
            } else if (Game.locationMap.locations.get('Office Hall Far').entities[0] instanceof ToyFreddy) {
                this.sprite.texture = this.officeHallwaySheet.textures['192.png'];
            } else {
                this.sprite.texture = this.officeHallwaySheet.textures['123.png'];
            }
        } else if (Game.rightVentLightOn || Game.leftVentLightOn) {
            if (Game.rightVentLightOn) {
                LightsButtons.rightSprite.swapTexture('94.png');
                if (Game.locationMap.locations.get('Office Right Vent').entities[0] instanceof ToyBonnie) {
                    this.sprite.texture = this.officeVentsSheet.textures['180.png'];
                } else if (false) {

                } else this.sprite.texture = this.officeVentsSheet.textures['168.png'];
            } 
            if (Game.leftVentLightOn) {
                LightsButtons.leftSprite.swapTexture('92.png');
                if (Game.locationMap.locations.get('Office Left Vent').entities[0] instanceof ToyChica) {
                    this.sprite.texture = this.officeVentsSheet.textures['79.png'];
                } else if (false) {

                } else this.sprite.texture = this.officeVentsSheet.textures['166.png'];
            }
        } else {
            this.sprite.texture = this.officeSheet.textures['92.png'];
            LightsButtons.rightSprite.swapTexture('99.png');
            LightsButtons.leftSprite.swapTexture('91.png');
        }
    }

    static updateLoop(ticker) {
        super.updateLoop(ticker);
        if (Game.blackout) {
            this.updateSprite();
            Game.blackoutElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            Game.blackoutFlashTime += (1/ticker.maxFPS) * ticker.deltaTime;
            if (Game.blackoutFlashTime >= 0.025) {
                Game.blackoutFlashTime = 0;
                this.blackoutBox.visible = Math.floor(Math.random()*2) === 0 ? true : false;
            }
            if (Game.blackoutElapsed > 3.0) {
                Game.blackoutElapsed = 0;
                this.blackoutBox.visible = true;
                Game.blackout = false;
                this.updateSprite();
            }
        } else {
            if (this.blackoutBox.visible && this.blackoutBox.alpha > 0) {
                this.blackoutBox.alpha -= 0.005 * ticker.deltaTime;
            } else {
                if (this.blackoutBox.visible) this.blackoutBox.visible = false;
                if (GameAssets.audio.stare.isPlaying) GameAssets.audio.stare.stop();
            }
        }
    }
}