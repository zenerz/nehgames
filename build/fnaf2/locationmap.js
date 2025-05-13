import { Animatronic } from "./animatronic";

class Location {
    constructor() {
        this.entities = [];
        this.capacity = Number.MAX_VALUE;
    }
}

class LocationMap {
    /** @param {Array<string>} locationList  */
    constructor(locationList) {
        /** @type {Map<string, Location>} */
        this.locations = new Map();
        locationList.forEach( l => {
            this.locations.set(l, new Location());
        });
        this.entities = {};
    }

    populate(list) {
        for (const [key, value] of Object.entries(list)) {
            if (value instanceof Animatronic) {
                this.entities[key] = value;
            }
        }
    }

    update(ticker) {
        for (const ent of Object.values(this.entities)) {

            ent.movement(ticker);
            ent.camUpCheck(ticker);
            ent.blackoutCheck(ticker);
            ent.update(ticker);

            const plo = this.locations.get(ent.previousLocation);
            const lo = this.locations.get(ent.currentLocation)

            if (lo !== undefined) {
                if (lo.entities.indexOf(ent) === -1) 
                    lo.entities.push(ent);
                if (ent.previousLocation) {
                    if (plo !== undefined && plo.entities.indexOf(ent) > -1)
                        plo.entities.splice(plo.entities.indexOf(ent), 1);
                }
            }

        }
    }
}


export { LocationMap, Location }