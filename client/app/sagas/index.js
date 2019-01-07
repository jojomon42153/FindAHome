import {all, fork} from "redux-saga/effects";

import homes from "./homes";
import notifications from "./notifications";

function* root() {
    yield all([
        fork(homes),
        fork(notifications)
    ]);
}

export default root;

