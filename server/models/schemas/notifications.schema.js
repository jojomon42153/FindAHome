module.exports = dtb => {
	return dtb.model("Notifications", new dtb.Schema({
		token: {type: String}
	}));
};
