import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvUr2MDQKPq7C_VFodmeXISTnNBTtVQYg",
  authDomain: "laundryapp-ac1f8.firebaseapp.com",
  projectId: "laundryapp-ac1f8",
  storageBucket: "laundryapp-ac1f8.appspot.com",
  messagingSenderId: "660744538646",
  appId: "1:660744538646:web:5835f1d2b9123799994337"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};