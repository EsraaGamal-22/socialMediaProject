// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_jKdsZnjb61wlwIczgItnjxCO5Tw-SLw",
  authDomain: "react-course-1abfe.firebaseapp.com",
  projectId: "react-course-1abfe",
  storageBucket: "react-course-1abfe.appspot.com",
  messagingSenderId: "414850152337",
  appId: "1:414850152337:web:c96c44bbac7400dca30c30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// establish connection to send data into database
export const db = getFirestore(app);
