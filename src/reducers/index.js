import { combineReducers } from 'redux';
import UrlReducer from './reducer_url';

const rootReducer = combineReducers({
  convertedUrl: UrlReducer
});

export default rootReducer;
