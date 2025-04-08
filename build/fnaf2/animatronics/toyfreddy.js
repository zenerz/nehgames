import Game from "../game";
import Office from "../office";
import { RoamingAnimatronic } from "./animatronic";

export default class ToyFreddy extends RoamingAnimatronic {
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

    movement(ticker) {
        if (Game.blackout) return;
        super.movement(ticker, () => {
            
        })
    }
}