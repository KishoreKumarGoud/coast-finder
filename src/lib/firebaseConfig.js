import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHiS-KE6gT9joLyMibu0QGKxSP2AtUsbU",
  authDomain: "coast-finder.firebaseapp.com",
  projectId: "coast-finder",
  storageBucket: "coast-finder.firebasestorage.app",
  messagingSenderId: "328091433676",
  appId: "1:328091433676:web:d63c8548a3f9cba3efe069",
  measurementId: "G-H9SYKRJ1VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);