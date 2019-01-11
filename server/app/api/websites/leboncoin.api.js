const lbcApi = require("leboncoin-api");

const {
    maxPrice,
    minRooms,
    locations,
    bedrooms
} = require("../../../config/criteria");

module.exports = {
    getHome: () => {
        let search = new lbcApi.Search()
            .setPage(1)
            .setCategory("locations");
        if (locations !== null) {
            search = search.setLocation(locations.map(zipCode => ({zipCode: zipCode.toString()})));
        }
        if (maxPrice !== null) {
            let max = maxPrice;
            const limit = max > 1000 ? 100 : 50;
            while (max % limit !== 0) {
                max += 1;
            }
            search = search.addSearchExtra("price", {max});
        }
        if (minRooms !== null) {
            search = search.addSearchExtra("rooms", {min: minRooms});
        }
        if (bedrooms !== null) {
            search = search.addSearchExtra("bedrooms", {min: bedrooms});
        }
        return search.run()
            .then(result => result.results.map(home => ({
                bedrooms: null,
                zipCode: home.location.zipcode,
                description: home.description,
                floor: null,
                title: home.title,
                elevator: null,
                link: home.link,
                images: home.images || null,
                price: home.price,
                ref: home.attributes.custom_ref,
                rooms: home.attributes.rooms,
                surface: home.attributes.square,
                from: "leboncoin",
                id: null,
                url: `https://www.leboncoin.fr/locations/${home.id}.htm`
            })))
            .catch(error => {
                console.error("Error from leboncoin: ", error);
                return [];
            });
    }
};

