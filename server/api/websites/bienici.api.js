const fetch = require("node-fetch");

module.exports = {
	getHome: () => {
			return fetch("https://www.bienici.com/realEstateAds.json?filters={\"size\":24,\"from\":0,\"filterType\":\"rent\",\"propertyType\":[\"house\",\"flat\"],\"maxPrice\":1250,\"minRooms\":4,\"newProperty\":false,\"page\":1,\"resultsPerPage\":24,\"maxAuthorizedResults\":2400,\"sortBy\":\"relevance\",\"sortOrder\":\"desc\",\"onTheMarket\":[true],\"mapMode\":\"enabled\",\"limit\":\"cpowGynz[?_vh@jxmArC?vlh@\",\"showAllModels\":false,\"blurInfoType\":[\"disk\",\"exact\"],\"zoneIdsByTypes\":{\"zoneIds\":[\"-120965\"]}}")
				.then(result => result.json());
	}
};

