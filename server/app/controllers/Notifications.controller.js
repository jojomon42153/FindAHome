const {Expo} = require("expo-server-sdk");

const NotificationsModel = require("../models/Notifications.model");

function* sendChunks(chunks, expoSdk) {
    for (const chunk of chunks) {
        yield expoSdk.sendPushNotificationsAsync(chunk);
    }
}

class Notifications {
    constructor() {
        this.model = new NotificationsModel();
        this.expoSdk = new Expo();
    }

    addUserToken(token) {
        return this.model.getToken(token)
            .then(result => {
                if (result === null) {
                    return this.model.addToken(token);
                }
            });
    }

    sendNotifications(params) {
        console.log(params);
        return require("../services/mailIt.js")(params);
    }
    // sendNotifications(notifications) {
    //     return this.model.getAll()
    //         .then(tokens => {
    //             if (tokens.length === 0) {
    //                 return ;
    //             }
    //             const chunks = [];
    //             const many = notifications.length > 1;
    //             tokens.map(({token}) => {
    //                 chunks.push(this.expoSdk.chunkPushNotifications([{
    //                     to: token,
    //                     body: `${notifications.length} new home${many ? "s" : ""} ${many ? "are" : "is"} here`,
    //                     priority: "high",
    //                     data: {homes: notifications}
    //                 }]));
    //             });
    //             const chunksLoop = () => {
    //                 const iterator = sendChunks(chunks.shift(), this.expoSdk);
    //                 (function loop() {
    //                     const value = iterator.next().value;
    //                     if (value !== undefined) {
    //                         value
    //                             .then(loop());
    //                     } else {
    //                         if (chunks.length > 0) {
    //                             chunksLoop();
    //                         }
    //                     }
    //                 })();
    //             };
    //             chunksLoop();
    //         });
    // }
}

module.exports = Notifications;

