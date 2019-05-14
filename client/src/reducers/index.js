import { combineReducers } from 'redux'; // This is what will allow us to combine all of the different reducers into one clean export
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
