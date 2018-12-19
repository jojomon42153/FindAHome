const fs = require("fs");

class Home {
	getHomes() {
		const promises = [];
		const files = fs.readdirSync("./api/websites/");
		files.map(file => promises.push((require(`..//api/websites/${file}`)).getHome()));
		Promise.all(promises)
			.then(homes => {
			});
	}
}

module.exports = Home;

