import {
    HOMES_GETTED,
    HOMES_DETAILS_GETTED
} from "../actions/homes";

const initialState = {
    homes: []
};

const homes = (state = initialState, {type, payload}) => {
    switch (type) {
    case HOMES_GETTED:
        return {
            ...state,
            homes: [
                ...payload
            ]
        };
    case HOMES_DETAILS_GETTED:
        return {
            ...state,
            homes: [
                ...state.homes.map(home => {
                    if (home.id === payload.id) {
                        return {...home, ...payload};
                    }
                    return home;
                })
            ]
        };
    default:
        return state;
    }
};

export default homes;

