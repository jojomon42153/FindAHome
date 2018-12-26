import config from "../../config/config";

export const getHomesAPI = () => {
	console.log(`${config.serverEndpoint}homes`);
	return fetch(`${config.serverEndpoint}homes`)
		.then(response => response.json());
};

