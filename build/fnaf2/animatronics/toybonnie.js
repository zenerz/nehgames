import Game from "../game";
import { RoamingAnimatronic } from "./animatronic";

export default class ToyBonnie extends RoamingAnimatronic {
    constructor() {
        super({aiLevel: 20, movementInterval: 2.0})
        this.currentLocation = '09';
        this.setPaths([
            ['09', ['03']],
            ['03', ['02']],
            ['02', ['06']],
            ['06', ['Right Vent']],
            ['Right Vent', ['Office']],
            ['Office', ['03']]
        ]);
    }

    movement(ticker) {
        super.movement(ticker, () => {
            console.log(this.currentLocation, Game.locationMap.locations);
        })
    }
}