import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGYTdxqDCby3SVQ7r63h3wdWM8G0M52Xw",
  authDomain: "gym-app-880a1.firebaseapp.com",
  projectId: "gym-app-880a1",
  storageBucket: "gym-app-880a1.appspot.com",
  messagingSenderId: "522693897568",
  appId: "1:522693897568:web:4e21f02f8bfcc9760f0205",
  measurementId: "G-MYFQKPF4LF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
