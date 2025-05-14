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
                        {alias: "OCRAStd", src: "/assets/fonts/OCRAStd.otf"},
                        {alias: "Volter", src: "/assets/fonts/Volter__28Goldfish_29.ttf"},
                        {alias: "fnaf", src: "/assets/fonts/five-nights-at-freddys.ttf"},
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
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/office/office.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/office/office@0.5x.png.json"},
                    ]
                },
                {
                    name: "officehallway",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/office/hallway.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/office/hallway@0.5x.png.json"},
                    ]
                },
                {
                    name: "officevents",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/office/vents.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/office/vents@0.5x.png.json"},
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
                    name: "flashlightbatteryicon",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/flashlightbatteryicon.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/flashlightbatteryicon@0.5x.png.json"},
                    ]
                },
                {
                    name: "lightsbuttons",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/lightsbuttons.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/lightsbuttons@0.5x.png.json"},
                    ]
                },
                {
                    name: "usebuttons",
                    assets: [
                        {alias: "mask", src: "/assets/fnaf2/sprites/120.png"},
                        {alias: "cams", src: "/assets/fnaf2/sprites/96.png"},
                    ]
                },
                {
                    name: "stage",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/stage.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/stage@0.5x.png.json"},
                    ]
                },
                {
                    name: "prizecorner",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/prizecorner.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/prizecorner@0.5x.png.json"},
                    ]
                },
                {
                    name: "gamearea",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/gamearea.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/gamearea@0.5x.png.json"},
                    ]
                },
                {
                    name: "mainhall",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/mainhall.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/mainhall@0.5x.png.json"},
                    ]
                },
                {
                    name: "parts&services",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/parts&services.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/parts&services@0.5x.png.json"},
                    ]
                },
                {
                    name: "partyroom4",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/partyroom4.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/partyroom4@0.5x.png.json"},
                    ]
                },
                {
                    name: "partyroom3",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/partyroom3.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/partyroom3@0.5x.png.json"},
                    ]
                },
                {
                    name: "partyroom2",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/partyroom2.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/partyroom2@0.5x.png.json"},
                    ]
                },
                {
                    name: "partyroom1",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/partyroom1.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/partyroom1@0.5x.png.json"},
                    ]
                },
                {
                    name: "cam-utilities",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/cams/utilities.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/cams/utilities@0.5x.png.json"},
                    ]
                },
                {
                    name: "musicbox",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/musicbox.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/musicbox.json"},
                    ]
                },
                {
                    name: "insideoffice",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/insideoffice.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/insideoffice@0.5x.png.json"},
                    ]
                },
                {
                    name: "fake3dshader",
                    assets: [
                        {alias: "frag", src: "/assets/fake3dfrag.txt"},
                        {alias: "vert", src: "/assets/fake3dvert.txt"},
                    ]
                },
                {
                    name: "puppetjumpscare",
                    assets: [
                        {alias: "spritesheet", src: "/assets/fnaf2/sprites/jumpscares/puppet.png"},
                        {alias: "spjson", src: "/assets/fnaf2/sprites/jumpscares/puppet@0.5x.png.json"},
                    ] 
                },
                {
                    name: "audio",
                    assets: [
                        {alias: "bgmusic", src: "/assets/fnaf2/audio/The_Sand_Temple_Loop_G.wav"},
                        {alias: "blip3", src: "/assets/fnaf2/audio/blip3.wav"},
                        {alias: "buzzlight", src: "/assets/fnaf2/audio/buzzlight.wav"},
                        {alias: "popstatic", src: "/assets/fnaf2/audio/popstatic.wav"},
                        {alias: "clockchimes", src: "/assets/fnaf2/audio/Clocks_Chimes_Cl_02480702.wav"},
                        {alias: "freddymask1", src: "/assets/fnaf2/audio/FENCING_42_GEN-HDF10953.wav"},
                        {alias: "freddymask2", src: "/assets/fnaf2/audio/FENCING_43_GEN-HDF10954.wav"},
                        {alias: "deepbreaths", src: "/assets/fnaf2/audio/deepbreaths.wav"},
                        {alias: "fansound", src: "/assets/fnaf2/audio/fansound.wav"},
                        {alias: "camflip1", src: "/assets/fnaf2/audio/STEREO_CASSETTE__90097704.wav"},
                        {alias: "camflip2", src: "/assets/fnaf2/audio/STEREO_CASSETTE__90097701.wav"},
                        {alias: "stare", src: "/assets/fnaf2/audio/stare.wav"},
                        {alias: "musicbox", src: "/assets/fnaf2/audio/Music_Box_Melody_Playful.wav"},
                        {alias: "windup2", src: "/assets/fnaf2/audio/windup2.wav"},
                        {alias: "ventwalk1", src: "/assets/fnaf2/audio/ventwalk1.wav"},
                        {alias: "jumpscare", src: "/assets/fnaf2/audio/Xscream2.wav"},
                    ]
                },
                {
                    name: "callaudios",
                    assets: [
                        {alias: "call1", src: "/assets/fnaf2/audio/call 1b.wav"},
                        {alias: "call2", src: "/assets/fnaf2/audio/call 2b.wav"},
                        {alias: "call3", src: "/assets/fnaf2/audio/call 3b.wav"},
                        {alias: "call4", src: "/assets/fnaf2/audio/call 4b.wav"},
                        {alias: "call5", src: "/assets/fnaf2/audio/call 5b.wav"},
                        {alias: "call6", src: "/assets/fnaf2/audio/call 6b.wav"},
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
        this.officehallway = await Assets.loadBundle('officehallway', tallyProgress);
        this.officevents = await Assets.loadBundle('officevents', tallyProgress);
        this.desk = await Assets.loadBundle('desk', tallyProgress);
        this.titlescreen = await Assets.loadBundle('titlescreen', tallyProgress);
        this.screens = await Assets.loadBundle('screens', tallyProgress);
        this.freddymask = await Assets.loadBundle('freddymask', tallyProgress);
        this.tablet = await Assets.loadBundle('tablet', tallyProgress);
        this.static1 = await Assets.loadBundle('static1', tallyProgress);
        this.blipflash = await Assets.loadBundle('blipflash', tallyProgress);
        this.flashlightbatteryicon = await Assets.loadBundle('flashlightbatteryicon', tallyProgress);
        this.lightsbuttons = await Assets.loadBundle('lightsbuttons', tallyProgress);
        this.usebuttons = await Assets.loadBundle('usebuttons', tallyProgress);

        this.stage = await Assets.loadBundle('stage', tallyProgress);
        this.gamearea = await Assets.loadBundle('gamearea', tallyProgress);
        this.prizecorner = await Assets.loadBundle('prizecorner', tallyProgress);
        this.mainhall = await Assets.loadBundle('mainhall', tallyProgress);
        this.partsservices = await Assets.loadBundle('parts&services', tallyProgress);
        this.partyroom4 = await Assets.loadBundle('partyroom4', tallyProgress);
        this.partyroom3 = await Assets.loadBundle('partyroom3', tallyProgress);
        this.partyroom2 = await Assets.loadBundle('partyroom2', tallyProgress);
        this.partyroom1 = await Assets.loadBundle('partyroom1', tallyProgress);

        this.camutils = await Assets.loadBundle('cam-utilities', tallyProgress);
        this.musicbox = await Assets.loadBundle('musicbox', tallyProgress);
        this.insideoffice = await Assets.loadBundle('insideoffice', tallyProgress);
        this.fake3dshader = await Assets.loadBundle('fake3dshader', tallyProgress);

        this.puppetjumpscare = await Assets.loadBundle('puppetjumpscare', tallyProgress);

        this.audio = await Assets.loadBundle('audio', tallyProgress);
        this.callaudios = await Assets.loadBundle('callaudios', tallyProgress);


        this.audio.bgmusic.play({loop: true});
        console.log(this.fonts)
    }
}