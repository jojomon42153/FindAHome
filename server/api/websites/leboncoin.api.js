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
			.run();
	}
};

