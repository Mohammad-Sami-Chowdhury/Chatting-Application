// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0tB-YdPwzrGiUvXtOoq8nrp5DVhDquCQ",
  authDomain: "chattybysami.firebaseapp.com",
  projectId: "chattybysami",
  storageBucket: "chattybysami.firebasestorage.app",
  messagingSenderId: "890355157446",
  appId: "1:890355157446:web:64d007eefa783d47d90ac7",
  measurementId: "G-5GKFRK1597"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig