// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const VITE_API_KEY = import.meta.env.VITE_API_KEY
const VITE_AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const VITE_STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET
const VITE_MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const VITE_APP_ID = import.meta.env.VITE_APP_ID

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;


/* // Mukafe Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjHqjirkjdAnXdTNR8iAcWZD85ROkfnbI",
  authDomain: "mukafestore.firebaseapp.com",
  projectId: "mukafestore",
  storageBucket: "mukafestore.appspot.com",
  messagingSenderId: "499848859058",
  appId: "1:499848859058:web:999faa6c8f47b304c2a8ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); */