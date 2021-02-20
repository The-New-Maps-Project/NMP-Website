import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB5dR_M5LglL5rK-2P5oA44lHduBUD8C2c",
  authDomain: "weighty-forest-287112.firebaseapp.com",
  databaseURL: "https://weighty-forest-287112.firebaseio.com",
  projectId: "weighty-forest-287112",
  storageBucket: "weighty-forest-287112.appspot.com",
  messagingSenderId: "631508830721",
  appId: "1:631508830721:web:12c9a8e47a3660603b0e00",
  measurementId: "G-WNX6CRT5Q3",
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var firestore = firebase.firestore();
var auth = firebase.auth();
var timestamp = firebase.firestore.FieldValue;

export { storage, firestore, auth, timestamp };
