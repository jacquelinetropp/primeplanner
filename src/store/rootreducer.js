import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./user/authreducer";
import weatherReducer from './weather/weatherReducer';


export default combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});