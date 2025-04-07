import Game from "../game";
import { RoamingAnimatronic } from "./animatronic";

export default class ToyChica extends RoamingAnimatronic {
    constructor(aiLevel) {
        super({aiLevel: aiLevel, movementInterval: 5.0})
        this.currentLocation = '09';
        this.setPaths([
            ['09', ['07']],
            ['07', ['04']],
            ['04', ['Office Hall Far']],
            ['Office Hall Far', ['01']],
            ['01', ['05']],
            ['05', ['Left Vent']],
            ['Left Vent', ['04']],
        ]);
    }

    movement(ticker) {
        if (Game.locationMap.entities.ToyBonnie.currentLocation === '09') return;
        super.movement(ticker, () => {

        })
    }
}