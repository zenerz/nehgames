import { Application, extensions, Text, Ticker } from 'pixi.js'
import { sound, soundAsset } from '@pixi/sound';
import GameAssets from './assets';
import root from './rootcontainer'
import Game from './game';
import Office from './office';
import MainMenu from './mainmenu';
import Screens from './screens';

(async () => {

    const app = new Application();
    await app.init({backgroundColor: 0x000000, resizeTo: window});
    app.canvas.classList.add('d-block', 'm-0');
    document.body.appendChild(app.canvas);
    app.stage.addChild(root);
    root.addChild(new Text({text: '', x: 1920/2-100, y:200, style: {fill: 0xffffff, fontSize: 50,}}))

    window.onresize = () => app.stage.scale.set(innerWidth/root.nativeResolution.x, innerHeight/root.nativeResolution.y);
    window.onresize();

    sound.disableAutoPause = true;
    extensions.add(soundAsset)

    await GameAssets.init(async () => {
        await MainMenu.init(root);
        await Game.init(root);
        await Screens.init(root);
    });

    app.ticker.add(ticker => root.updateLoop(ticker));
    
})();