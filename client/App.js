import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";

import Homes from "./app/containers/homes.container";
import reducers from "./app/reducers/";
import sagas from "./app/sagas";

class Index extends Component {
	constructor() {
		super();
		this.store = null;
	}

	componentWillMount() {
		const sagaMiddlware = createSagaMiddleware();
		this.store = createStore(reducers, applyMiddleware(sagaMiddlware));
		sagaMiddlware.run(sagas);
	}

	render() {
		return (
			<Provider store={this.store}>
				<Homes />
			</Provider>
		);
	}
}

export default Index;

