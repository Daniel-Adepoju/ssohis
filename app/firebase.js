import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBqcOLeUNUQlaRl69DBucfa1iAKZa0ugKc",
    authDomain: "test-38167.firebaseapp.com",
    projectId: "test-38167",
    storageBucket: "test-38167.firebasestorage.app",
    messagingSenderId: "619995181688",
    appId: "1:619995181688:web:3a1ceb7ef6d66766af738d"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)