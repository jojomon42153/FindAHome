import {call, all, fork, takeEvery} from "redux-saga/effects";

import {sendTokenAPI} from "../api/notifications.api";
import {NOTIFICATIONS_TOKEN_SEND} from "../actions/notifications";

function* sendToken({payload}) {
    try {
        yield call(sendTokenAPI, payload);
    } catch (error) {
        console.error("An error occured: ", error);
    }
}

function* sendTokenWatcher() {
    yield takeEvery(NOTIFICATIONS_TOKEN_SEND, sendToken);
}

function* flow() {
    yield all([
        fork(sendTokenWatcher)
    ]);
}

export default flow;

