import { Application } from 'pixi.js'

(async () => {

    const app = new Application();
    await app.init({backgroundColor: 0x000000, resizeTo: window});

    document.body.appendChild(app.canvas);

    app.ticker.add(ticker => {

    });

})();