import { Container } from "pixi.js";
const root = new Container();
root.visualAspects = [];
Object.defineProperty(root, 'nativeResolution', {
    writable: false,
    configurable: false,
    value: {x: 1920, y: 1080}
})
Object.defineProperty(root, 'updateLoop', {
    writable: false,
    configurable: false,
    value: (ticker) => {
        for (const va of Object.values(root.visualAspects)) {va.updateLoop(ticker);}
    }
})
export default root;