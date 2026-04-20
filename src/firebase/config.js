// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALM3wDkp7Y85TIQX-cs_Ancn9N619Ynck",
  authDomain: "blog-app-fe72e.firebaseapp.com",
  projectId: "blog-app-fe72e",
  storageBucket: "blog-app-fe72e.firebasestorage.app",
  messagingSenderId: "234750436482",
  appId: "1:234750436482:web:4dfaddf7d96a0ce5c3c09b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};