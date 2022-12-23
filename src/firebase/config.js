// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMw7EjYjWkPP4lVo8kXysqie4kFXiD1PY",
  authDomain: "algospace-ron0.firebaseapp.com",
  projectId: "algospace-ron0",
  storageBucket: "algospace-ron0.appspot.com",
  messagingSenderId: "365047884037",
  appId: "1:365047884037:web:6fbf793e5dde5b11076f6c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const projectFirestore = getFirestore()

export { projectFirestore }