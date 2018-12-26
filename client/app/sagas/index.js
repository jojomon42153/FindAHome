import {all, fork} from "redux-saga/effects";

import homes from "./homes";

function* root() {
	console.log("Executing all sagas");
	yield all([fork(homes)]);
}

export default root;

