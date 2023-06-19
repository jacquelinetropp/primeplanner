import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyB3FaQp_hnU3fDdfiATog6IsvkMTQpQTyg",
    authDomain: "primeplanner-ea1b6.firebaseapp.com",
    projectId: "primeplanner-ea1b6",
    storageBucket: "primeplanner-ea1b6.appspot.com",
    messagingSenderId: "1037269057305",
    appId: "1:1037269057305:web:c9b4f0a791fbea89bbcf88"
};

firebase.initializeApp(config);
firebase.firestore();
export default firebase;