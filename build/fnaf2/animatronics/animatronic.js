import { Ticker } from "pixi.js";

class Animatronic {
    /** @param {{aiLevel: number, movementInterval: number}} options */
    constructor(options) {
        this.aiLevel = options.aiLevel || 0;
        this.movementInterval = options.movementInterval || 5;
        this.timeElapsed = 0;
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
            this.movementInterval = 0;
            if (Math.floor(Math.random() * 20 + 1) <= this.movementInterval) {
                successfulMovementCallback();
                this.updateSprite();
            }
        }
    }

    updateSprite() {}
}

class RoamingAnimatronic extends Animatronic {
    /** @param {{aiLevel: number, movementInterval: number, paths}} options */
    constructor(options) {
        super(options);
        /** @type {Map<string, Array<string>} */
        this.paths;
        this.setPaths(options.paths);
        this.currentLocation = this.paths.values().next().value;
    }

    setPaths(paths) {
        if (paths instanceof Array) {
            this.paths = new Map(paths);
        } else {
            this.paths = paths;
        }
        return this;
    }

    /** @param {Ticker} ticker * @param {Function} movementCallBack   */
    movement(ticker, movementCallBack) {
        super.movement(ticker, () => {
            const possiblePaths = this.paths.get(this.currentLocation);
            const nextLocation = possiblePaths[Math.random() * possiblePaths.length];
            this.currentLocation = nextLocation;
            movementCallBack();
        });
    }
}

export { Animatronic, RoamingAnimatronic }