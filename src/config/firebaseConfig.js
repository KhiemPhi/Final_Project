import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyDayXDyTp7UL9YLGtXVcToiKYrcN94XDtA",
  authDomain: "wireframer-project-2eb8a.firebaseapp.com",
  databaseURL: "https://wireframer-project-2eb8a.firebaseio.com",
  projectId: "wireframer-project-2eb8a",
  storageBucket: "wireframer-project-2eb8a.appspot.com",
  messagingSenderId: "1045859712191",
  appId: "1:1045859712191:web:84d5c07c9e259f3e03da0a",
  measurementId: "G-M22HXTXT97"
};


firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;