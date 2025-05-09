import { Ticker } from "pixi.js";
import Game from "../game";
import UI from "../ui";
import Office from "../office";

class RandomIntervalCheck {
    /** @param {{interval: Number, denominator: Number, successfullCheckCallBack: Function}} options  */
    constructor(options = {}) {
        this.timeElapsed = 0;
        this.interval = options.interval || 0.5;
        this.denominator = options.denominator || 10;
        this.successfullCheckCallBack = options.successfullCheckCallBack || (() => {});
    }

    updateCheck(ticker, successfullCheckCallBack) {
        this.timeElapsed += (ticker.maxFPS/1) * ticker.deltaTime;
        if (this.timeElapsed >= this.interval) {
            this.timeElapsed = 0;
            if (Math.floor(Math.random() * this.denominator) === 0) {
                if (successfullCheckCallBack) {
                    successfullCheckCallBack();
                } else if (this.successfullCheckCallBack) {
                    this.successfullCheckCallBack();
                }
            }
        }
    }
}

class Animatronic {
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

    updateSprite() {}

    update() {}
}

class RoamingAnimatronic extends Animatronic {
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
            const keysArray = Array.from(this.paths.keys())
            const next = keysArray[keysArray.indexOf(this.currentLocation)+1];
            if (next === 'Office' || this.currentLocation === 'Office') return;
            this.updateLocation();
        })
    }
}

class OfficeInvaderAnimatronic extends RoamingAnimatronic {
    constructor(options) {
        super(options);
    }

    camUpCheck(ticker) {
        const keysArray = Array.from(this.paths.keys())
        const next = keysArray[keysArray.indexOf(this.currentLocation)+1];
        if (Game.camUp) {
            if (next === 'Office') {
                this.camUpRandomInterval.updateCheck(ticker, () => {
                    if (!Game.blackout && this.updateLocation()) {
                        Office.blackoutSequence();
                        UI.camsButton.onpointerenter();
                    }
                });
            }
            if (this.currentLocation === 'Office') {
                this.camUpRandomInterval.updateCheck(ticker, () => {
                    UI.camsButton.onpointerenter();
                });
            }
        }
        console.log(this.camUpRandomInterval.timeElapsed)
    }

    blackoutCheck(ticker) {
        const keysArray = Array.from(this.paths.keys())
        const next = keysArray[keysArray.indexOf(this.currentLocation)+1];
        if (Game.blackout && this.currentLocation === keysArray[keysArray.length-1]) {
            this.blackoutElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            this.blackoutWindowElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
            if (this.blackoutWindowElapsed >= this.blackoutReactionTime) {
                this.blackoutWindowElapsed = Number.MIN_VALUE;
                this.leave = Game.maskOn;
                console.log(this.leave)
            }
        } else this.blackoutElapsed = 0;
    }
}

export { Animatronic, RoamingAnimatronic, OfficeInvaderAnimatronic }