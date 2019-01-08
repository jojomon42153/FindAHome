import config from "../../config/config";

export const getHomesAPI = () => {
    return fetch(`${config.serverEndpoint}homes`)
        .then(response => response.json())
        .catch(error => console.error(error));
};

export const getDetailsAPI = id => {
    return fetch(`https://www.seloger.com/detail,json,caracteristique_bien.json?idannonce=${id}`)
        .then(response => response.json());
};

