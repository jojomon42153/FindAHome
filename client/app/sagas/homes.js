import {call, put, all, fork} from "redux-saga/effects";

import {getHomesAPI} from "../api/homes.api";
import {HOMES_GETTED} from "../actions/homes";

function* getHomes() {
    try {
        const payload = yield call(getHomesAPI, 2000);
        yield put({payload, type: HOMES_GETTED});
    } catch (error) {
        console.error("An error occured: ", error);
    }
}

function* flow() {
    yield all([
        fork(getHomes)
    ]);
}

export default flow;

