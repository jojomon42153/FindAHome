const NotificationsController = new (require("../../../controllers/Notifications.controller"))();

const sendToken = app => {
	app.post("/notifications/token", (req, res) => {
		NotificationsController.addUserToken(req.body.token)
			.then(() => res.status(200).send({}))
			.catch(error => {
				console.error("Notifications.post.sendToken", error);
				res.status(500).send("An unknown error occured");
			})
	});
};

module.exports = sendToken;

