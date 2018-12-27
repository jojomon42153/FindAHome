import config from "../../config/config";

export const getHomesAPI = () => {
	return fetch(`${config.serverEndpoint}homes`)
		.then(response => response.json());
};

