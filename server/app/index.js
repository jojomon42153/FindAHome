const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
require("./models/schemas/home.schema")(mongoose);
require("./models/schemas/notifications.schema")(mongoose);
const HomeController = new (require("./controllers/Home.controller"))();
const routes = require("./routes/");
const config = require("../config/config");

app.listen(3000, () => {
    let intervalId;
    let routesLoaded = false;
    let dtbConnected = false;
    mongoose.connection.on("connected", () => {
        dtbConnected = true;
        console.info("Server is running");
        HomeController.updateHomes();
        intervalId = setInterval(() => HomeController.updateHomes(), config.fetchInterval * 60000);
        if (!routesLoaded) {
            app.use((req, res, next) => {
                if (dtbConnected) {
                    return next();
                }
                res.status(500).send("An error occured");
            });
            routes(app);
            routesLoaded = true;
        }
    });
    mongoose.connection.on("disconnected", () => {
        dtbConnected = false;
        console.error("Disconnected from database");
        clearInterval(intervalId);
    });
    (function connectDtb() {
        mongoose.connect("mongodb://localhost/FindAHome", {useNewUrlParser: true})
            .catch(error => {
                console.error("Couldn't connect to dtb", error);
                setTimeout(() => connectDtb(), 5000);
            });
    })();
});
