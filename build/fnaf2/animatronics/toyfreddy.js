import Game from "../game";
import { OfficeInvaderAnimatronic, RoamingAnimatronic } from "./animatronic";

export default class ToyFreddy extends OfficeInvaderAnimatronic {
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
}