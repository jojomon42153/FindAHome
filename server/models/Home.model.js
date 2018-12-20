const dtb = require("mongoose").model("Home");

class HomeModel {
	deleteAll() {
		return dtb.deleteMany({});
	}

	update(homes) {
		return this.deleteAll()
			.then(() => dtb.create(homes));
	}

	getAll() {
		return dtb.find({}, null, {lean: true});
	}
}

module.exports = HomeModel;

