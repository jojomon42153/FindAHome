import config from "../../config/config";

export const sendTokenAPI = token => {
	return fetch(`${config.serverEndpoint}notifications/token`, {
		method: "POST",
		headers: {"Content-type": "application/json"},
		body: JSON.stringify({token})
	});
};

