const {Expo} = require("expo-server-sdk");

const NotificationsModel = require("../models/Notifications.model");

class Notifications {
    constructor() {
        this.model = new NotificationsModel();
        this.expoSdk = new Expo();
    }

    sendNotifications(params) {
        return require("../services/mailIt.js")(params);
    }
}

module.exports = Notifications;

