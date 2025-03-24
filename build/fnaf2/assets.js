import { Assets } from "pixi.js";
import root from "./rootcontainer";

export default class GameAssets {
    static async init() {
        const manifest = {
            bundles: [
                {
                    name: "titlescreen",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/titlescreen.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/titlescreen@0.5x.png.json"},
                    ]
                },
                {
                    name: "office",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/office.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/office@0.5x.png.json"},
                    ]
                },
                {
                    name: "desk",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/desk.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/desk@0.5x.png.json"},
                    ]
                },
                {
                    name: "static1",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/static1.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/static1@0.5x.png.json"},
                    ]
                },
                {
                    name: "freddymask",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/freddymask.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/freddymask@0.5x.png.json"},
                    ]
                },
                {
                    name: "tablet",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/tablet.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/tablet@0.5x.png.json"},
                    ]
                },
            ]
        };
        
        await Assets.init({manifest: manifest});

        const totalassetcount = (() => {let c = 0; manifest.bundles.forEach(b => b.assets.forEach(a => c++)); return c})();
        let assetcount = 0;
        console.log(totalassetcount)

        function tallyProgress(p) {
            assetcount ++;
            console.log(assetcount/totalassetcount);
            root.getChildAt(0).text = (assetcount/totalassetcount)*100+"% loaded";
            if (assetcount/totalassetcount >= 1) {
                
            }
        }

        manifest.bundles.forEach(async bundle => {
            this[bundle.name] = await Assets.loadBundle(bundle.name, tallyProgress);
        });
    }
}