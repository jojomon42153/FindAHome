const fetch = require("node-fetch");

module.exports = {
	getHome: () => {
		return fetch("https://www.seloger.com/list.htm?types=1&projects=1&enterprise=0&rooms=4&bedrooms=3&places=[{ci%3A690382}]&qsVersion=1.0")
			.then(result => {
				return result.text()
					.then(response => {
						response = JSON.parse(response.split("\"products\" : ")[1].split("\"ctx\"")[0].trim().slice(0, -1));
						return response;
					});
			});
	}
};

