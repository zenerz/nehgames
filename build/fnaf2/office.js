import { AnimatedSprite, Container, Filter, GlProgram, Graphics, Rectangle, Sprite, Ticker } from "pixi.js";
import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";
import root from "./rootcontainer";
import GameAssets from "./assets";

export default class Office extends VisualAspect {
    static async init(root, parent) {
        super.init(root, parent);
        
        /** @type {Sprite} */
        this.sprite = this.add(await SpriteLoader.Sprite('office'));
        this.sprite.swapTexture('93.png')
        this.sprite.setSize(root.nativeResolution.x, root.nativeResolution.y);
        this.sprite.anchor.x = 0.5;
        this.sprite.x = root.nativeResolution.x/2;
        this.sprite.scale.x = 1.8;

        this.margin = (this.sprite.width-this.sprite.width/this.sprite.scale.x)/2.75;

        /** @type {Container} */
        this.desk = this.add(await SpriteLoader.AnimatedSprite('desk', anim => {
            anim.anchor.x = 0.5;
        }));
        this.desk.playAnimation();
        this.desk.position.set(root.nativeResolution.x/2, root.nativeResolution.y-this.desk.currentAnimation.height);
        this.desk.scale.x = this.sprite.scale.x;

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
    }
}