const HomeController = new (require("../../../controllers/Home.controller"))();

const getAll = app => {
	app.get("/homes", (req, res) => {
		HomeController.getHomes()
			.then(homes => {
				res.send(homes);
			})
			.catch(error => {
				console.error("Homes.get.getAll", error);
				res.send(500, "An unknown error occured");
			})
	});
}

module.exports = getAll;

