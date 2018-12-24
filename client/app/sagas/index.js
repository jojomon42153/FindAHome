import {all} from "redux-saga/effects";

import homes from "./homes";

function* root() {
	yield all({homes});
}

export default root;

