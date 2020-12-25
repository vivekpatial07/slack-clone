import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyCHBQINXscbjk0A5HKm4P4aJzsg2aLhuZc",
  authDomain: "slack-clone-07.firebaseapp.com",
  projectId: "slack-clone-07",
  storageBucket: "slack-clone-07.appspot.com",
  messagingSenderId: "59599709825",
  appId: "1:59599709825:web:ee45a01be1e84501314f80",
  measurementId: "G-9PR3HVZ4HV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
