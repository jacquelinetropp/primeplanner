import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./user/authreducer";
import weatherReducer from './weather/weatherReducer';
import projectReducer from "./projects/projectReducer";
import todosReducer from './todos/todosReducer';
import houseReducer from './house/houseReducer';
import budgetReducer from "./budget/budgetReducer";


export default combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  projects: projectReducer,
  todos: todosReducer,
  house: houseReducer,
  finance: budgetReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});