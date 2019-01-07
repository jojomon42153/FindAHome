import {connect} from "react-redux";

import Homes from "../components/Homes.component";
import {NOTIFICATIONS_TOKEN_SEND} from "../actions/notifications";
import {HOMES_GET_DETAILS} from "../actions/homes";

const mapStateToProps = state => {
    const {homes} = state.homes;
    return {
        homes
    };
};

const mapDispatchToProps = dispatch => ({
    sendNotificationsToken: payload => dispatch({payload, type: NOTIFICATIONS_TOKEN_SEND}),
    getDetails: payload => dispatch({payload, type: HOMES_GET_DETAILS})
});

export default connect(mapStateToProps, mapDispatchToProps)(Homes);

