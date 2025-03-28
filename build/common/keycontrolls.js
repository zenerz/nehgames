export default class KeyControlls {
    constructor() {
        this.keyCodes = {};
        window.addEventListener('keydown', e => {this.keyCodes[e.code] = true; console.log(e.code)});
        window.addEventListener('keyup', e => this.keyCodes[e.code] = false);
    }

    getKeyStatus(key) {
        return this.keyCodes[key];
    }
}