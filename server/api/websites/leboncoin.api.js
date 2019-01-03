const fetch = require("node-fetch");
const lbcApi = require("leboncoin-api");

module.exports = {
	getHome: () => {
		return new lbcApi.Search()
			.setPage(1)
			.setCategory("locations")
			.setRegion("rhone_alpes")
			.setLocation([{zipcode: "69002"}])
			.addSearchExtra("price", {max: 1300})
			.run()
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
				rooms: home.attributes.rooms,
				from: "leboncoin"
			})))
			.catch(error => {
				console.error("Error from leboncoin: ", error);
				return [];
			});
	}
};

