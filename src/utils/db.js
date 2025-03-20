import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeHeuMPQJrX3NfYS09YbqvYS24oKjQsR0",
  authDomain: "mtm6404-claist-cb21e.firebaseapp.com",
  projectId: "mtm6404-claist-cb21e",
  storageBucket: "mtm6404-claist-cb21e.firebasestorage.app",
  messagingSenderId: "331633729781",
  appId: "1:331633729781:web:b01254902975846c45a5bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;