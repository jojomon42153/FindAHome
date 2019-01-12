import {
    call,
    put,
    all,
    fork,
    takeEvery
} from "redux-saga/effects";

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
        let description = dom.split("'descriptionBien', {")[1];
        if (description === undefined) {
            return ;
        }
        description = description.split("enumerable")[0].trim().split("value: \"")[1].split("\",")[0].split("\\'").join("'");
        const images = [];
        dom.split("//v.seloger.com/s/width/800/visuels").map((e, index) => {
            const src = `https://v.seloger.com/s/width/800/visuels${e.split(".jpg")[0]}.jpg`;
            if (index !== 0 && !images.includes(src)) {
                images.push(src);
            }
        });
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

