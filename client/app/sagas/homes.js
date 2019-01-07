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
        const {descriptif} = yield call(getDetailsAPI, payload);
        yield put({payload: {id: payload, description: descriptif}, type: HOMES_DETAILS_GETTED});
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

