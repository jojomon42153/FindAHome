const NotificationsModel = require("../models/Notifications.model");

class Notifications {
	constructor() {
		this.model = new NotificationsModel();
	}

	addUserToken(token) {
		return this.model.getToken(token)
			.then(result => {
				if (result === null) {
					return this.model.addToken(token);
				}
			});
	}
}

module.exports = Notifications;

