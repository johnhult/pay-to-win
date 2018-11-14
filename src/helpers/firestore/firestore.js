import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
	apiKey: "AIzaSyDP4EVw3G79sIBA_VZpGweX-ZxZgRTw6xs",
	authDomain: "pay-to-win-be.firebaseapp.com",
	databaseURL: "https://pay-to-win-be.firebaseio.com",
	projectId: "pay-to-win-be",
	storageBucket: "pay-to-win-be.appspot.com",
	messagingSenderId: "686453984551"
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
	timestampsInSnapshots: true
});

export default db;

export const firestore = firebase.firestore;
