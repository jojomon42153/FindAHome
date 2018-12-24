import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

class App extends Component {
	render() {
		return (
			<View style={styles.wrapper}>
				<Text>{"HelloWorld"}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "purple",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default App;

