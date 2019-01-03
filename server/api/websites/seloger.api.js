const fetch = require("node-fetch");

module.exports = {
	getHome: () => {
		return fetch("https://www.seloger.com/list_agatha_ajax_avadata_christie.htm?types=1&projects=1&enterprise=0&price=NaN/1250&surface=50/NaN&rooms=4&bedrooms=3&places=[{ci:690382}|{ci:690387}]&qsVersion=1.0")
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
							from: "seloger"
						}));
					})
					.catch(error => {
						console.error("Error from seloger: ", error);
						return [];
					});
			});
	}
};

