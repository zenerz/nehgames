import Game from "../game";
import { OfficeInvaderAnimatronic, RoamingAnimatronic } from "./animatronic";

export default class ToyBonnie extends OfficeInvaderAnimatronic {
    constructor() {
        super({aiLevel: 20, movementInterval: 5.0})
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
}