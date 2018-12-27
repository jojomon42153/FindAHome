import {connect} from "react-redux";

import Homes from "../components/Homes.component";

const mapStateToProps = state => {
	const {homes} = state.homes;
	return {
		homes
	};
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Homes);

