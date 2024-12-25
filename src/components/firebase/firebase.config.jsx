// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7W8R_T21VQuZ3q1HGXURmHnQDS4I5G-U",
  authDomain: "hugababa-f7547.firebaseapp.com",
  databaseURL: "https://hugababa-f7547-default-rtdb.firebaseio.com",
  projectId: "hugababa-f7547",
  storageBucket: "hugababa-f7547.appspot.com",
  messagingSenderId: "323426329617",
  appId: "1:323426329617:web:99989f0ed7c88ad8fc3db0",
  measurementId: "G-QRK1282KEP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
