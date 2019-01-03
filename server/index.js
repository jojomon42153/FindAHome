const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
require("./models/schemas/home.schema")(mongoose);
require("./models/schemas/notifications.schema")(mongoose);
const HomeController = new (require("./controllers/Home.controller"))();
const routes = require("./routes/");
const config = require("./config/config");

app.listen(3000, () => {
	mongoose.connection.on("connected", () => {
		console.log("Server is running");
		HomeController.updateHomes();
		setInterval(() => HomeController.updateHomes(), config.fetchInterval * 60000);
		routes(app);
	});
 	mongoose.connect("mongodb://localhost/FindAHome", {useNewUrlParser: true});
});
