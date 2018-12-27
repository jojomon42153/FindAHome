import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Dimensions,
	Image
} from "react-native";
import PropTypes from "prop-types";
import Carousel from "react-native-looped-carousel";

class Homes extends Component {
	constructor(props) {
		super(props);

		this.width = 0;
	}

	componentWillMount() {
		this.width = Dimensions.get("window").width;
	}

	renderHomes() {
		return (
			<FlatList
				data={Object.values(this.props.homes)}
				renderItem={({item}, key) => {
					return (
						<View style={styles.home} key={`home${key}`}>
							<Carousel
								style={{width: this.width, height: 300, backgroundColor: "green"}}
								autoplay={false}
							>
								{item.images !== null ? item.images.map(img => {
									return (
										<Image
											source={{uri: img.url}}
											style={{width: this.width, height: "100%", resizeMode: "contain"}}
										/>
									);
								}) : <View />}
							</Carousel>
							<Text>{item.description}</Text>
						</View>
					);
				}}
			>
				
			</FlatList>
		);
	}

	render() {
		return (
			<View style={styles.wrapper}>
				{this.renderHomes()}
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
		alignItems: "center",
	},
	home: {
		width: "100%",
		backgroundColor: "orange",
		overflow: "hidden",
		marginTop: "7%"
	}
});

Homes.propTypes = {
	homes: PropTypes.object.isRequired
};

export default Homes;

