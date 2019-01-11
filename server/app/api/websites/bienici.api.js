const fetch = require("node-fetch");

const {
    maxPrice,
    minRooms
} = require("../../../config/criteria");

module.exports = {
    getHome: () => {
        let extra = "";
        if (maxPrice !== null) {
            extra += `"maxPrice":${maxPrice},`;
        }
        if (minRooms !== null) {
            extra += `"minRooms":${minRooms},`;
        }
        return fetch(`https://www.bienici.com/realEstateAds.json?filters={"size":24,"from":0,"filterType":"rent","propertyType":["house","flat"],${extra}"newProperty":false,"page":1,"resultsPerPage":24,"maxAuthorizedResults":2400,"sortBy":"relevance","sortOrder":"desc","onTheMarket":[true],"mapMode":"enabled","limit":"cpowGynz[?_vh@jxmArC?vlh@","showAllModels":false,"blurInfoType":["disk","exact"],"zoneIdsByTypes":{"zoneIds":["-10680", "-10682"]}}`)
            .then(result => {
                return result.json()
                    .then(result => result.realEstateAds.map(home => ({
                        bedrooms: home.bedroomsQuantity,
                        zipCode: home.postalCode,
                        description: home.description,
                        floor: home.floor,
                        elevator: home.hasElevator,
                        images: home.photos.map(({url}) => url),
                        price: home.price,
                        ref: home.reference,
                        rooms: home.roomsQuantity,
                        surface: home.surfaceArea,
                        title: home.title,
                        link: null,
                        from: "bienici",
                        id: null,
                        url: `https://www.bienici.com/annonce/location/appartement/${home.id}`
                    })));
            })
            .catch(error => {
                console.error("Error from bienici: ", error);
                return [];
            });
    }
};

