import { Application, Text } from 'pixi.js'
import GameAssets from './assets';
import root from './rootcontainer'
import Game from './game';
import MainMenu from './mainmenu';

(async () => {

    const app = new Application();
    await app.init({backgroundColor: 0x000000, resizeTo: window});
    app.canvas.classList.add('d-block', 'm-0');
    document.body.appendChild(app.canvas);
    app.stage.addChild(root);
    root.addChild(new Text({text: '', x: 1920/2-100, y:200, style: {fill: 0xffffff, fontSize: 50,}}))

    window.onresize = () => app.stage.scale.set(innerWidth/root.nativeResolution.x, innerHeight/root.nativeResolution.y);
    window.onresize();

    await GameAssets.init(async () => {
        await Game.init();
        await MainMenu.init();
        root.addChild(MainMenu.container);
    });

    app.ticker.add(ticker => {

    });
})();