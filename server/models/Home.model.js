const dtb = require("mongoose").model("Home");

class HomeModel {
	getHomes() {
		return dtb.find({});
	}
}

module.exports = HomeModel;

