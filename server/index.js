const express = require("express");
const fetch = require("node-fetch");

const app = express();
const HomeController = new (require("./controllers/Home.controller"))();

app.listen(3000, () => {
	console.log("Server is running");
	HomeController.getHomes();
});
