import { Application, Text } from 'pixi.js'
import GameAssets from './assets';
import root from './rootcontainer'
import Game from './game';

(async () => {

    const app = new Application();
    await app.init({backgroundColor: 0x000000, resizeTo: window});
    app.canvas.classList.add('d-block', 'm-0');
    document.body.appendChild(app.canvas);
    app.stage.addChild(root);
    root.addChild(new Text({text: '', x: 1920/2, y:200, style: {fill: 0xffffff}}))

    await GameAssets.init();
    await Game.init();

    window.onresize = e => {
        const scale = {x: 1920/innerWidth, y: 1080/innerHeight};
        app.stage.scale.set(scale.x, scale.y);
    };

    app.ticker.add(ticker => {

    });
})();