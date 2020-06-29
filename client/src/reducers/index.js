import { combineReducers } from 'redux';
import charReducer from './charReducer';
import matchReducer from './matchReducer';
import googleApiReducer from './googleApiReducer';

export default combineReducers({
  char: charReducer,
  match: matchReducer,
  googleApi: googleApiReducer,
});
