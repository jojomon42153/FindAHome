const fs = require("fs");
const crypto = require("crypto-js");
const {Expo} = require("expo-server-sdk");

const HomeModel = require("../models/Home.model");
const NotificationController = require("./Notifications.controller");

class Home {
	constructor() {
		this.expoSdk = new Expo();
		this.model = new HomeModel();
		this.notificationController = new NotificationController();
	}

	createChecksums(homes) {
		return homes.map(home => {
			home.checksum = crypto.MD5(`${home.price}${home.rooms}${home.zipCode}`).toString();
			return home;
		});
	}

	getHomes() {
		return this.model.getAll();
	}

	updateHomes() {
		console.info("Updating homes...");
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
								if (notify.length > 0) {
									return this.notificationController.sendNotifications(notify);
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

