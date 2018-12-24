import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from "./app/components/App";
import reducers from "./app/reducers/";

class Index extends Component {
	render() {
		const store = createStore(reducers);
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

export default Index;

