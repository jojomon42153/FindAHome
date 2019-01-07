const fetch = require("node-fetch");

const {
    maxPrice,
    minRooms,
    bedrooms,
    locations
} = require("../../config/criteria");

module.exports = {
    getHome: () => {
        let extra = "";
        if (maxPrice !== null) {
            extra += `price=NaN/${maxPrice}`;
        }
        if (minRooms !== null) {
            if (extra !== "") {
                extra += "&";
            }
            extra += `rooms=${minRooms}`;
        }
        if (bedrooms !== null) {
            if (extra !== "") {
                extra += "&";
            }
            extra += `bedrooms=${bedrooms}`;
        }
        if (locations !== null) {
            if (extra !== "") {
                extra += "&";
            }
            extra += `places=${JSON.stringify(locations.map(cp => ({cp}))).split("\"").join("").split(",").join("|")}`;
        }
        if (extra !== "") {
            extra += "&";
        }
        return fetch(`https://www.seloger.com/list_agatha_ajax_avadata_christie.htm?types=1&projects=1&enterprise=0&surface=50/NaN&${extra}qsVersion=1.0`)
            .then(result => {
                return result.json()
                    .then(response => {
                        return response.products.map(home => ({
                            bedrooms: home.nb_chambres,
                            zipCode: home.codepostal,
                            description: null,
                            floor: home.etage,
                            title: null,
                            elevator: null,
                            link: null,
                            images: null,
                            price: home.prix,
                            ref: null,
                            rooms: home.nb_pieces,
                            surface: home.surface.replace(",", "."),
                            from: "seloger",
                            id: home.idannonce
                        }));
                    })
                    .catch(error => {
                        console.error("Error from seloger: ", error);
                        return [];
                    });
            });
    }
};

