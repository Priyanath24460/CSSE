// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // Import Auth
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-amGGTjEPkWY3jYFmHUeDUF9x16m0NTk",
    authDomain: "csse-a5dd7.firebaseapp.com",
    projectId: "csse-a5dd7",
    storageBucket: "csse-a5dd7.appspot.com",
    messagingSenderId: "68682092380",
    appId: "1:68682092380:web:4c886cef2b63f7a48e7b99",
    measurementId: "G-0Y22WTSKQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

export { db, auth }; // Export both Firestore and Auth
