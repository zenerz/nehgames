import { Ticker } from "pixi.js";
import Game from "./game";
import UI from "./ui";
import Screens from "./screens";
import GameAssets from "./assets";
import Jumpscare from "./jumpscare";

export class RandomIntervalCheck {
    /** @param {{interval: Number, denominator: Number, successfullCheckCallBack: Function}} options  */
    constructor(options = {}) {
        this.timeElapsed = 0;
        this.interval = options.interval || 0.5;
        this.denominator = options.denominator || 10;
        this.successfullCheckCallBack = options.successfullCheckCallBack || (() => {});
    }

    updateCheck(ticker, successfullCheckCallBack, condition = () => { return true }) {
        if (condition()) {
            this.timeElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.timeElapsed > this.interval) {
                this.timeElapsed = 0;
                if (Math.floor(Math.random() * this.denominator) === 0) {
                    if (successfullCheckCallBack) {
                        successfullCheckCallBack();
                    } else if (this.successfullCheckCallBack) {
                        this.successfullCheckCallBack();
                    }
                }
            }
        } else if (this.timeElapsed != 0) {
            this.timeElapsed = 0;
        }
    }
}

export class Animatronic {
    /** @param {{aiLevel: number, movementInterval: number}} options */
    constructor(options) {
        this.aiLevel = options.aiLevel || 0;
        this.movementInterval = options.movementInterval || 5;
        this.timeElapsed = 0;
        this.camUpElapsed = 0;
        this.blackoutReactionTime = options.blackoutReactionTime || 1.0;
        this.blackoutElapsed = 0;
        this.blackoutWindowElapsed = 0;
        this.currentLocation = null;
        this.previousLocation = null;
        this.killCoolDown = 5;
        this.killCoolDownElapsed = 0;
        this.killCoolDownActive = false;
        this.canKill = false;
    }

    /** @param {number} aiLevel */
    setAI(aiLevel) {
        this.aiLevel = aiLevel; return this;
    }

    /** @param {number} mInt */
    setMoveInterval(mInt) {
        this.movementInterval = mInt; return this;
    }

    /** @param {Ticker} ticker * @param {Function} successfulMovementCallback */
    movement(ticker, successfulMovementCallback) {
        this.timeElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
        if (this.timeElapsed >= this.movementInterval) {
            this.timeElapsed = 0;
            if (Math.floor(Math.random() * 20 + 1) <= this.aiLevel) {
                successfulMovementCallback();
            } else console.log('fail')
        }
    }

    jumpscare() {
        Game.gameOver();
    }

    updateSprite() {}

    update(ticker) {
        if (this.killCoolDownActive) {
            this.killCoolDownElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.killCoolDownElapsed >= this.killCoolDown) {
                this.killCoolDownActive = false;
                this.canKill = true;
                this.killCoolDownElapsed = 0;
            }
        }
    }
}

export class RoamingAnimatronic extends Animatronic {
    /** @param {{aiLevel: number, movementInterval: number, paths}} options */
    constructor(options) {
        super(options);
        /** @type {Map<string, Array<string>} */
        this.paths;
        this.setPaths(options.paths);
        this.currentLocation = this.paths ? this.paths.keys().next().value : null;
        this.leave = true;

        this.camUpRandomInterval = new RandomIntervalCheck();
    }

    setPaths(paths) {
        if (paths instanceof Array) {
            this.paths = new Map(paths);
        } else {
            this.paths = paths;
        }
        return this;
    }

    getNextLocation() {
        const keysArray = Array.from(this.paths.keys())
        const next = keysArray[keysArray.indexOf(this.currentLocation)+1];
        return next;
    }

    updateLocation() {
        const possiblePaths = this.paths.get(this.currentLocation);
        const nextLocation = possiblePaths[Math.floor(Math.random() * possiblePaths.length)];
        if (Game.locationMap.locations.get(nextLocation).entities.length >= Game.locationMap.locations.get(nextLocation).capacity) {
            console.log('full room')
            return false;
        }
        this.previousLocation = this.currentLocation;
        this.currentLocation = nextLocation;
        console.log(this.constructor.name, this.currentLocation, 'updated');
        return true;
    }

    movement(ticker) {
        super.movement(ticker, () => {
            if (
                this.getNextLocation() === 'Office' ||
                this.currentLocation === 'Office' || 
                this.currentLocation === 'Office Left Vent' ||
                this.currentLocation === 'Office Right Vent'
            ) return false;
            return this.updateLocation();
        })
    }
}

export class OfficeInvaderAnimatronic extends RoamingAnimatronic {
    constructor(options) {
        super(options);
        this.maskOnRandomInterval = new RandomIntervalCheck();
    }

    camUpBlackOut(ticker) {
        if (this.getNextLocation() === 'Office') {
            this.camUpRandomInterval.updateCheck(ticker, () => {
                if (!Game.blackout && this.updateLocation()) {
                    UI.camsButton.onpointerenter();
                    Game.blackoutSequence();
                }
            }, () => { return Game.camUp });
        }
        if (this.currentLocation === 'Office') {
            this.camUpRandomInterval.updateCheck(ticker, () => {
                UI.camsButton.onpointerenter();
                this.jumpscare();
            }, () => { return Game.camUp });
        }
    }

    blackoutCheck(ticker) {
        const keysArray = Array.from(this.paths.keys())
        if (Game.blackout && this.currentLocation === keysArray[keysArray.length-1]) {
            this.blackoutElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            this.blackoutWindowElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.blackoutWindowElapsed >= this.blackoutReactionTime) {
                this.blackoutWindowElapsed = Number.MIN_VALUE;
                this.leave = Game.maskOn;
                console.log(this.leave)
            }
        } else {
            this.blackoutElapsed = 0;
            if (this.leave) {
                this.leave = false;
                this.updateLocation();
            }
        }
    }
}

/**
 * ===========================
 *  Office Invader Animatronics
 * ===========================
 */

export class ToyFreddy extends OfficeInvaderAnimatronic {
    constructor() {
        super({aiLevel: 20, movementInterval: 5.0})
        this.currentLocation = '09';
        this.setPaths([
            ['09', ['10']],
            ['10', ['Office Hall Far']],
            ['Office Hall Far', ['Office Hall Close']],
            ['Office Hall Close', ['Office']],
            ['Office', ['09']]
        ]);
    }

    update(ticker) {
        super.update(ticker);
        this.camUpBlackOut(ticker);
        this.blackoutCheck(ticker);
    }
}

export class ToyBonnie extends OfficeInvaderAnimatronic {
    constructor(options) {
        super(options)

        this.maskOnRandomInterval2 = new RandomIntervalCheck({interval: 1, denominator: 3});

        this.maskOnRandomInterval.denominator = 2;
        this.maskOnRandomInterval.interval = 0.5;

        this.currentLocation = '09';
        this.setPaths([
            ['09', ['04']],
            ['04', ['03']],
            ['03', ['02']],
            ['02', ['06']],
            ['06', ['Right Vent']],
            ['Right Vent', ['Office Right Vent']],
            ['Office Right Vent', ['Office']],
            ['Office', ['03']],
        ]);
    }

    update(ticker) {
        super.update(ticker);
        if (this.currentLocation === 'Office Right Vent') {
            if (Game.blackout) {
                this.maskOnRandomInterval2.updateCheck(ticker, () => {
                    this.previousLocation = this.currentLocation;
                    this.currentLocation = Array.from(this.paths.keys())[Array.from(this.paths.keys()).length-1];
                    GameAssets.audio.ventwalk1.play();
                }, () => { return Game.maskOn });
            }
            this.maskOnRandomInterval.updateCheck(ticker, () => {
                if (!Game.blackout && this.updateLocation()) {
                    Game.blackoutSequence();
                }
            }, () => { return Game.maskOn });
        }
        if (this.currentLocation === 'Office' || this.currentLocation === 'Office Right Vent') {
            this.camUpRandomInterval.updateCheck(ticker, () => {
                UI.camsButton.onpointerenter();
                Game.jumpscare = true;
                GameAssets.audio.jumpscare.play({volume: 0.5});
                Jumpscare.toyBonnieJumpscare.playAnimation();
                Jumpscare.toyBonnieJumpscare.visible = true;
                Jumpscare.toyBonnieJumpscare.currentAnimation.onComplete = () => { 
                    Jumpscare.toyBonnieJumpscare.visible = false;
                    Jumpscare.toyBonnieJumpscare.currentAnimation.gotoAndStop(0);
                    this.jumpscare();
                }
            }, () => { return Game.camUp });
        }
        this.blackoutCheck(ticker);
    }

    movement(ticker) {
        if (super.movement(ticker)) GameAssets.audio.ventwalk1.play();
    }
}

export class ToyChica extends OfficeInvaderAnimatronic {
    constructor(options) {
        super(options);

        this.maskOnRandomInterval.denominator = 3;
        this.maskOnRandomInterval.interval = 0.1;

        this.camUpRandomInterval.interval = 1;

        this.currentLocation = '09';
        this.setPaths([
            ['09', ['07']],
            ['07', ['04']],
            ['04', ['Office Hall Far']],
            ['Office Hall Far', ['01']],
            ['01', ['Left Vent']],
            ['Left Vent', ['Office Left Vent']],
            ['Office Left Vent', ['04']],
        ]);
    }

    update(ticker) {
        super.update(ticker);
        if (this.currentLocation === 'Office Left Vent') {
            this.maskOnRandomInterval.updateCheck(ticker, () => {
                this.updateLocation();
                GameAssets.audio.ventwalk1.play();
            }, () => { return Game.maskOn });
            this.camUpRandomInterval.updateCheck(ticker, () => {
                if (!Game.blackout) {
                    UI.camsButton.onpointerenter();
                    this.jumpscare();
                }
            }, () => { return Game.camUp });
        }
    }

    movement(ticker) {
        if (super.movement(ticker)) GameAssets.audio.ventwalk1.play();
    }
}

export class Puppet extends RoamingAnimatronic {
    constructor(options) {
        super(options);

        this.movementInterval = 1.0;
        this.camUpRandomInterval.interval = 1.0;
        this.camUpRandomInterval.denominator = 10;

        this.active = false;
        this.outOfBox = false;
        this.outOfBoxProgress = 0;
        this.outOfBoxElapsed = 0;

        this.currentLocation = '11';
        this.setPaths([
            ['11', ['07']],
            ['07', ['Office Hall Far']],
            ['Office Hall Far', ['Office']],
            ['Office Hall Close', ['Office']],
            ['Office', ['11']]
        ]);
    }

    movement(ticker) {
        if (this.active && !this.outOfBox) {
            this.outOfBoxElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.outOfBoxElapsed >= this.movementInterval) {
                this.outOfBoxElapsed = 0;
                if (Math.floor(Math.random() * 20 + 1) <= this.aiLevel) {
                    this.outOfBoxProgress++;
                    if (this.outOfBoxProgress >= 3) {
                        this.outOfBoxProgress = 3;
                        this.outOfBox = true;
                        this.updateLocation();
                    }
                }
            }
        }
        if (this.active && this.outOfBox && this.currentLocation !== 'Office') {
            this.timeElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.timeElapsed >= this.movementInterval) {
                this.timeElapsed = 0;
                if (Math.floor(Math.random() * 20 + 1) <= this.aiLevel) {
                    this.updateLocation();
                }
            }
        }
    }

    update(ticker) {
        if (Game.musicBoxProgress <= 0) {
            this.active = true;
        }
        if (this.currentLocation === 'Office') {
            this.camUpRandomInterval.updateCheck(ticker, () => {
                if (Game.maskOn) UI.maskButton.onpointerenter();
                if (Game.camUp) UI.camsButton.onpointerenter();
                Game.jumpscare = true;
                GameAssets.audio.jumpscare.play({volume: 0.5});
                Jumpscare.puppetJumpscare.playAnimation();
                Jumpscare.puppetJumpscare.visible = true;
                Jumpscare.puppetJumpscare.currentAnimation.onComplete = () => { 
                    Jumpscare.puppetJumpscare.visible = false;
                    Jumpscare.puppetJumpscare.currentAnimation.gotoAndStop(0);
                    this.jumpscare();
                }
            });
        }
    }
}