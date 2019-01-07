const dtb = require("mongoose").model("Notifications");

class NotificationsModel {
    getToken(token) {
        return dtb.findOne({token}, null, {lean: true});
    }

    getAll() {
        return dtb.find({}, ["token"], {lean: true});
    }

    addToken(token) {
        return dtb.create({token});
    }
}

module.exports = NotificationsModel;

