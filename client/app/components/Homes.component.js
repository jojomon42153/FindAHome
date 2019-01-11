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
import {
    Permissions,
    Notifications,
    WebBrowser
} from "expo";

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

const PER_PAGE = 5;
class Homes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromNotif: [],
            index: PER_PAGE
        };

        this.width = 0;
        this.updating = false;
        this.isFirstUpdate = true;
    }

    componentWillMount() {
        this.width = Dimensions.get("window").width;
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if (status === "granted") {
                    this.sendNotificationsToken();
                } else {
                    return Permissions.askSync(Permissions.NOTIFICATIONS)
                        .then(({status}) => {
                            if (status === "granted") {
                                this.sendNotificationsToken();
                            }
                        });
                }
            })
            .catch(error => console.error(error));
        Notifications.addListener(notification => this.setState({fromNotif: notification.data.homes}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.index !== prevState.index ||
            this.isFirstUpdate ||
            this.state.fromNotif.length !== prevState.fromNotif.length ||
            (prevProps.homes.length === 0 && this.props.homes.length > 0 && this.state.fromNotif.length !== 0)) {
            this.updating = false;
            this.isFirstUpdate = false;
            const homes = this.state.fromNotif.length > 0 ? 
                this.props.homes.filter(({checksum}) => this.state.fromNotif.includes(checksum)) :
                this.props.homes.slice(0, this.state.index);
            homes.map(({from, url, id}) => {
                if (from === "seloger") {
                    this.props.getDetails({url, id});
                }
            });
        }
    }

    sendNotificationsToken() {
        Notifications.getExpoPushTokenAsync()
            .then(token => this.props.sendNotificationsToken(token))
            .catch(error => console.error(error));
    }

    renderHomes() {
        const fromNotif = this.state.fromNotif.length > 0;
        const homes = fromNotif ?
            this.props.homes.filter(({checksum}) => this.state.fromNotif.includes(checksum)) :
            this.props.homes;
        if (homes.length === 0) {
            return (
                <Text>{fromNotif ? "Notification has expired" : "No home match with your criteria"}</Text>
            );
        }
        return (
            <FlatList
                removeClippedSubviews={true}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    if (!this.updating && this.state.index < this.props.homes.length && !fromNotif) {
                        this.updating = true;
                        this.setState({index: this.state.index + PER_PAGE});
                    }
                }}
                data={fromNotif ?
                    homes :
                    homes.slice(0, this.state.index)}
                renderItem={({item}, key) => {
                    return (
                        <View style={styles.home} key={`home${key}`}>
                            <Carousel
                                style={{width: this.width, height: 300, backgroundColor: "green"}}
                                autoplay={false}
                                arrows={true}
                                leftArrowStyle={{height: "100%", width: this.width / 2}}
                                rightArrowStyle={{height: "100%", width: this.width / 2}}
                                leftArrowText={" "}
                                rightArrowText={" "}
                                bullets={true}
                            >
                                {item.images !== null ? item.images.map((uri, key) => {
                                    return (
                                        <Image
                                            source={{uri}}
                                            style={{width: this.width, height: "100%", resizeMode: "contain"}}
                                            key={`${item.checksum}${key}`}
                                        />
                                    );
                                }) : <View />}
                            </Carousel>
                            <Text>{`${item.from.substr(0, 1).toUpperCase()}${item.from.substr(1)}`}</Text>
                            <Text>{`Price: ${item.price}€`}</Text>
                            <Text>{`Surface: ${item.surface}m2`}</Text>
                            <Text>{`Zip code: ${item.zipCode}`}</Text>
                            <Text
                                onPress={() => WebBrowser.openBrowserAsync(item.url)}
                                style={{color: "blue"}}
                            >
                                {"URL"}
                            </Text>
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

Homes.propTypes = {
    homes: PropTypes.array.isRequired,
    sendNotificationsToken: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired
};

export default Homes;

