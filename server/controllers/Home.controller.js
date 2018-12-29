const fs = require("fs");
const crypto = require("crypto-js");
const {Expo} = require("expo-server-sdk");

const HomeModel = require("../models/Home.model");
const NotificationsModel = require("../models/Notifications.model");

class Home {
	constructor() {
		this.expoSdk = new Expo();
		this.model = new HomeModel();
		this.notificationModel = new NotificationsModel();
	}

	createChecksums(homes) {
		return homes.map(home => {
			home.checksum = crypto.MD5(JSON.stringify(home)).toString();
			return home;
		});
	}

	getHomes() {
		return this.model.getAll();
	}

	updateHomes() {
		const promises = [];
		const files = fs.readdirSync("./api/websites/");
		files.map(file => promises.push((require(`../api/websites/${file}`)).getHome()));
		Promise.all(promises)
			.then(homes => {
				let allHomes = [];
				homes.map(arr => allHomes = allHomes.concat(arr));
				allHomes = this.createChecksums(allHomes);
				return this.model.getAll()
					.then(savedHomes => {
						const notify = [];
						allHomes.map(home => {
							const element = savedHomes.find(element => element.checksum === home.checksum);
							if (element === undefined) {
								notify.push(home);
							}
						});
						return this.model.update(allHomes)
							.then(() => {
								if (notify.length > 0 || true) {
									return this.notificationModel.getAll()
										.then(tokens => {
											console.log("Tokens: ", tokens);
											tokens.map(({token}) => {
												const chunks = this.expoSdk.chunkPushNotifications([{
													to: token,
													sound: "default",
													body: "A new home is here"
												}]);
												(async () => {
													for (let chunk of chunks) {
														try {
															await this.expoSdk.sendPushNotificationsAsync(chunk);
															console.log("Sent notification");
														} catch(error) {
															console.error("Error: ", error);
														}
													}
												})();
											});
										});
								}
							});
					});
			})
			.catch(error => {
				console.error("An error occured", error);
			});
	}
}

module.exports = Home;

