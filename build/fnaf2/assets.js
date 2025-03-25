import { Assets } from "pixi.js";
import root from "./rootcontainer";

export default class GameAssets {
    static async init(callBack) {
        this.manifest = {
            bundles: [
                {
                    name: "fonts",
                    assets: [
                        {alias: "Consolas", src: "/assets/fonts/consolas.ttf"},
                        {alias: "OCRAStd", src: "/assets/fonts/OCRAStd.otf"}
                    ]
                },
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
                {
                    name: "screens",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/screens.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/screens@0.5x.png.json"},
                    ]
                },
                {
                    name: "blipflash",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/blipflash.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/blipflash@0.5x.png.json"},
                    ]
                },
                {
                    name: "audio",
                    assets: [
                        {alias: "bgmusic", src: "/assets/fnaf2/audio/The_Sand_Temple_Loop_G.wav"}
                    ]
                }
            ]
        };
        
        await Assets.init({manifest: this.manifest});

        const totalassetcount = (()=>{let c=0;this.manifest.bundles.forEach(b => b.assets.forEach(a => c++)); return c})();
        let assetcount = 0;

        function tallyProgress(p) {
            const label = root.getChildAt(0);
            assetcount ++;
            label.text = (assetcount/totalassetcount)*100+"% loaded";
            if (assetcount/totalassetcount >= 1) {
                label.text = 'Loading Complete!';
                setTimeout(() => {
                   root.removeChildAt(0); 
                   callBack();
                }, 222);
            }
        }

        Assets.ProgressCallback = p => {
            console.log(p)
        }

        this.fonts = await Assets.loadBundle('fonts', tallyProgress);
        this.office = await Assets.loadBundle('office', tallyProgress);
        this.desk = await Assets.loadBundle('desk', tallyProgress);
        this.titlescreen = await Assets.loadBundle('titlescreen', tallyProgress);
        this.screens = await Assets.loadBundle('screens', tallyProgress);
        this.freddymask = await Assets.loadBundle('freddymask', tallyProgress);
        this.tablet = await Assets.loadBundle('tablet', tallyProgress);
        this.static1 = await Assets.loadBundle('static1', tallyProgress);
        this.blipflash = await Assets.loadBundle('blipflash', tallyProgress);

        this.audio = await Assets.loadBundle('audio', tallyProgress);

        console.log(this.audio.bgmusic.play({loop: true}))
    }
}