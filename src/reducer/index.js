import { combineReducers } from "redux";
import { firebaseStateReducer as firebase } from "react-redux-firebase";
import firebaseReducer from "react-redux-firebase/lib/reducer";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
