import {call, put, all, fork} from "redux-saga/effects";
import {delay} from "redux-saga";

import {getHomesAPI} from "../api/homes.api";
import {HOMES_GETTED} from "../actions/homes";

function* getHomes() {
	try {
		const payload = yield call(getHomesAPI, 2000);
		console.log("Homes: ", payload);
		yield put({payload, type: HOMES_GETTED});
	} catch (error) {
		console.log("An error occured: ", error);
	}
}

function* flow() {
	yield all([
		fork(getHomes)
	]);
}

export default flow;

