import * as types from './../actions/types';


const INITIAL_STATE = {
    loading: false,
    url: null,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case types.GET_URL:
            return {
                ...state,
                url: action.payload,
                loading: false,
                error: null
            }
        case types.ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}