import { combineReducers } from 'redux';
import twitter from './twitter';
import wiki from './wiki';

const reducer = combineReducers({
  twitter, wiki
});
export default reducer;
