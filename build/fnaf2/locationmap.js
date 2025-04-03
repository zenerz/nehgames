class Location {
    constructor() {
        this.entities = [];
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
    }
}


export { LocationMap, Location }