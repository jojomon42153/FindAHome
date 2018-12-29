const NotificationsController = new (require("../../../controllers/Notifications.controller"))();

const sendToken = app => {
	app.post("/notifications/token", (req, res) => {
		NotificationsController.addUserToken(req.body.token)
			.then(() => res.send(200, {}))
			.catch(error => {
				console.error("Notifications.post.sendToken", error);
				res.send(500, "An unknown error occured");
			})
	});
};

module.exports = sendToken;

