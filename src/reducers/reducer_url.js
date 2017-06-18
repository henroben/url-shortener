import { GET_SHORT_URL, LOADING, ERROR } from '../actions/index';

const INITIAL_STATE = {
    loading: false,
    shorturl: null,
    longurl: null,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case GET_SHORT_URL:
            console.log('short_url', action.payload);
            return {
                ...state,
                shorturl: action.payload,
                loading: false,
                error: null
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}