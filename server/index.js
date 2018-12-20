const express = require("express");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const app = express();
require("./models/schemas/home.schema")(mongoose);
const HomeController = new (require("./controllers/Home.controller"))();

app.listen(3000, () => {
	mongoose.connection.on("connected", () => {
		console.log("Server is running");
		HomeController.getHomes();
	});
 	mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});
});
