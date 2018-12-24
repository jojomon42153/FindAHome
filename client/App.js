import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";

import App from "./app/components/App";
import reducers from "./app/reducers/";
import sagas from "./app/sagas";

class Index extends Component {
	render() {
		const sagaMiddlware = createSagaMiddleware();
		const store = createStore(reducers, applyMiddleware(sagaMiddlware));
		sagaMiddlware.run(sagas);
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

export default Index;

