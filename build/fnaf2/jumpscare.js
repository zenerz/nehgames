import SpriteLoader from "../common/spriteloader";
import VisualAspect from "../common/visualaspect";

export default class Jumpscare extends VisualAspect {
    static async init(root) {
        super.init(root);

        this.puppetJumpscare = this.add(await SpriteLoader.AnimatedSprite('puppetjumpscare', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.animationSpeed = 0.5;
            anim.loop = false;
        }));
        this.puppetJumpscare.visible = false;

        this.toyBonnieJumpscare = this.add(await SpriteLoader.AnimatedSprite('toybonniejumpscare', anim => {
            anim.setSize(root.nativeResolution.x, root.nativeResolution.y);
            anim.animationSpeed = 0.5;
            anim.loop = false;
        }));
        this.toyBonnieJumpscare.visible = false;
    }
}
