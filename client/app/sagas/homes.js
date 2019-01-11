import {
    call,
    put,
    all,
    fork,
    takeEvery
} from "redux-saga/effects";
import DomParser from "xmldom";

import {
    getHomesAPI,
    getDetailsAPI
} from "../api/homes.api";
import {
    HOMES_GETTED,
    HOMES_GET_DETAILS,
    HOMES_DETAILS_GETTED
} from "../actions/homes";

function* getHomes() {
    try {
        const payload = yield call(getHomesAPI);
        yield put({payload, type: HOMES_GETTED});
    } catch (error) {
        console.error("An error occured: ", error);
    }
}

function* getDetails({payload}) {
    try {
        const dom = yield call(getDetailsAPI, payload.url);
        const parser = new DomParser.DOMParser().parseFromString(dom.split("&nbsp").join(" ").split("&eacute").join("é").split("@#").join(""), "text/html");
        let description = dom.split("'descriptionBien', {")[1];
        if (description === undefined) {
            return ;
        }
        description = description.split("enumerable")[0].trim().split("value: \"")[1].split("\",")[0].split("\\'").join("'");
        const imgElements = parser.getElementsByTagName("img");
        const images = [];
        let i = 0;
        while (i < imgElements.$$length) {
            const src = imgElements.item(i).getAttribute("src");
            if (src.includes("visuels")) {
                /* TODO Replace //static url by https://static */
                console.log("Src: ", src);
                images.push(src);
            }
            i += 1;
        }
        yield put({payload: {id: payload.id, description, images}, type: HOMES_DETAILS_GETTED});
    } catch (error) {
        console.error("An error occured", error);
    }
}

function* getDetailsWatcher() {
    yield takeEvery(HOMES_GET_DETAILS, getDetails);
}

function* flow() {
    yield all([
        fork(getHomes),
        fork(getDetailsWatcher)
    ]);
}

export default flow;

