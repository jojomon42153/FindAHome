import config from "../../config/config";

export const getHomesAPI = () => {
    return fetch(`${config.serverEndpoint}homes`)
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const getDetailsAPI = url => {
    return fetch(url)
        .then(response => response.text())
        .catch(error => console.error(error));
};

