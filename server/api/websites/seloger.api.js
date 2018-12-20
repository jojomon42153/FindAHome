const fetch = require("node-fetch");

module.exports = {
	getHome: () => {
		return fetch("https://www.seloger.com/list.htm?types=1,2&projects=1&enterprise=0&price=NaN/1250&rooms=4&bedrooms=3&places=[{ci:690382}]&qsVersion=1.0")
			.then(result => {
				return result.text()
					.then(response => {
						response = response.split("\"products \" : ")[1];
						if (response === undefined) {
							console.error("An error occured with Seloger");
							return [];
						}
						response = JSON.parse(response.split("\"ctx\"")[0].trim().slice(0, -1));
						return response.map(home => ({
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
							surface: home.surface
						}));
					});
			});
	}
};

