import {connect} from "react-redux";

import Homes from "../components/Homes.component";
import {NOTIFICATIONS_TOKEN_SEND} from "../actions/notifications";

const mapStateToProps = state => {
    const {homes} = state.homes;
    return {
        homes
    };
};

const mapDispatchToProps = dispatch => ({
    sendNotificationsToken: payload => dispatch({payload, type: NOTIFICATIONS_TOKEN_SEND})
});

export default connect(mapStateToProps, mapDispatchToProps)(Homes);

