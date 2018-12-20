const fs = require("fs");

const HomeModel = require("../models/Home.model");

class Home {
	constructor() {
		this.model = new HomeModel();
	}

	getHomes() {
		const promises = [];
		const files = fs.readdirSync("./api/websites/");
		files.map(file => promises.push((require(`../api/websites/${file}`)).getHome()));
		Promise.all(promises)
			.then(homes => {
				let allHomes = [];
				homes.map(arr => allHomes = allHomes.concat(arr));
				return this.model.getHomes()
					.then(savedHomes => {
						console.log(savedHomes);
						return allHomes;
					});
			})
			.catch(error => {
				console.error("An error occured", error);
			});
	}
}

module.exports = Home;

