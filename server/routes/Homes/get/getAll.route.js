const HomeController = new (require("../../../controllers/Home.controller"))();

const getAll = app => {
	app.get("/homes", (req, res) => {
		HomeController.getHomes()
			.then(homes => res.status(200).send(homes))
			.catch(error => {
				console.error("Homes.get.getAll", error);
				res.status(500).send("An unknown error occured");
			})
	});
}

module.exports = getAll;

