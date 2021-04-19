import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./user/authreducer";
import weatherReducer from './weather/weatherReducer';
import projectReducer from "./projects/projectReducer";
import todosReducer from './todos/todosReducer';


export default combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  projects: projectReducer,
  todos: todosReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});