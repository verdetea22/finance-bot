import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDteusAFmimBb7yBkKLzbfj4XT5QEaIQBY",
  authDomain: "finance-bot-cae6d.firebaseapp.com",
  projectId: "finance-bot-cae6d",
  storageBucket: "finance-bot-cae6d.appspot.com",
  messagingSenderId: "196627868418",
  appId: "1:196627868418:web:3f01eb979e23527b23301b",
  measurementId: "G-HW0PK6R8Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("initialized");
//Get Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

//export firebase services
export { auth, storage, db };