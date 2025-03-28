class Animatronic {
    constructor(aiLevel, movementInterval) {
        this.aiLevel = aiLevel;
        this.movementInterval = movementInterval;
        this.currentState = null;
        this.possibleStates;
        this.timeElapsed = 0;
    }

    movement(ticker, successfulMovementCallback) {
        this.timeElapsed += (1/ticker.maxFPS) * ticker.deltaTime;
        if (this.timeElapsed >= this.movementInterval) {
            this.movementInterval = 0;
            if (Math.floor(Math.random() * 20 + 1) <= this.movementInterval) {
                successfulMovementCallback();
            }
        }
    }
}

class RoamingAnimatronic extends Animatronic {

}

export { Animatronic }