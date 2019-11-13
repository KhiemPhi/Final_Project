import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB7e6-vHjg77fDwbkSVZ-uEHNBiMAKhcms",
    authDomain: "homework3-1b0a1.firebaseapp.com",
    databaseURL: "https://homework3-1b0a1.firebaseio.com",
    projectId: "homework3-1b0a1",
    storageBucket: "homework3-1b0a1.appspot.com",
    messagingSenderId: "277302621636",
    appId: "1:277302621636:web:3e0a8b9eb3bf0578cde091",
    measurementId: "G-GRR75XW9VX"
  };

firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;