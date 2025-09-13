// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMIBSNT1FkK8XYQyQFldw3txnh1DbVspM",
  authDomain: "the-world-of-magic-wiki-thai.firebaseapp.com",
  projectId: "the-world-of-magic-wiki-thai",
  storageBucket: "the-world-of-magic-wiki-thai.firebasestorage.app",
  messagingSenderId: "1051629461515",
  appId: "1:1051629461515:web:7063ffb41838538781e70e",
  measurementId: "G-E7G0R3QY0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
