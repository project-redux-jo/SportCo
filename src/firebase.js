import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, 
  signInWithPopup, 
  
} from "firebase/auth";
import { getDatabase, ref, set, get, push, remove ,update, onValue,} from "firebase/database";

// تكوين Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdc7ua3VJ_jcLhlhsYR1F3LsV4bHs_G9g",
    authDomain: "redux-project-791e5.firebaseapp.com",
    databaseURL: "https://redux-project-791e5-default-rtdb.firebaseio.com",
    projectId: "redux-project-791e5",
    storageBucket: "redux-project-791e5.firebasestorage.app",
    messagingSenderId: "530648960770",
    appId: "1:530648960770:web:136ec5a57a82352f80bc1b"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
   
  signInWithPopup, 
  googleProvider,
  database,
  ref,
  set,
  get,
  push,
  remove,
  update
  ,getAuth 
  ,onValue,

};
