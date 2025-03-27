import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBQPv02i7xYfneGva1dDtAoKlbK2q2cej0",
  authDomain: "carbon-footprint-calc-e8dd6.firebaseapp.com",
  projectId: "carbon-footprint-calc-e8dd6",
  storageBucket: "carbon-footprint-calc-e8dd6.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "922529270816",
  appId: "1:922529270816:web:d362c793d0ae4f7c580045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Fix Firestore initialization
export const auth = getAuth(app);
export default app;
