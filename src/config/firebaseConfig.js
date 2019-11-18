import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyA2aoOBNenowQHaAYXQHHbTOpzOPzykEzg",
  authDomain: "todolist3-b2156.firebaseapp.com",
  databaseURL: "https://todolist3-b2156.firebaseio.com",
  projectId: "todolist3-b2156",
  storageBucket: "todolist3-b2156.appspot.com",
  messagingSenderId: "1093704753422",
  appId: "1:1093704753422:web:a09321254d8c16e494f75f",
  measurementId: "G-FGH2YQZ9RW"
};

firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;