import {HOMES_GETTED} from "../actions/homes";

const initialState = {
	homes: []
};

const homes = (state = initialState, {type, payload}) => {
	switch (type) {
		case HOMES_GETTED:
			return {
				...state,
				homes: {
					...payload
				}
			};
		default:
			return state;
	}
}

export default homes;

