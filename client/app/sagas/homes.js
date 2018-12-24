import {call, put, all, fork} from "redux-saga/effects";
import {delay} from "redux-saga";

import {HOMES_GETTED} from "../actions/homes"

function* getHomes() {
	yield call(delay, 2000);
	yield put({type: HOMES_GETTED});
}

function* flow() {
	yield all([
		fork(getHomes)
	]);
}

export default flow;

