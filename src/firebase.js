import firebase from "firebase/compat/app"; // Note the use of 'compat' for compatibility with older versions
import "firebase/compat/database"; // You can also import other Firebase services as needed


const firebaseConfig = {
  apiKey: "AIzaSyDN5aoiJvcK7K-Pit5aesHJwiQGKnVdv60",
  authDomain: "minor-5f7c5.firebaseapp.com",
  databaseURL: "https://minor-5f7c5-default-rtdb.firebaseio.com",
  projectId: "minor-5f7c5",
  storageBucket: "minor-5f7c5.appspot.com",
  messagingSenderId: "6993427988",
  appId: "1:6993427988:web:7701bf4be3e7c9b585f101",
  measurementId: "G-K2EFB4HXYE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export { database };