import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const API_KEY = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: "footbase-51104.firebaseapp.com",
  projectId: "footbase-51104",
  storageBucket: "footbase-51104.appspot.com",
  messagingSenderId: "419100321692",
  appId: "1:419100321692:web:3de68252140a9d0e160a59",
  measurementId: "G-SZ2HFCCQ8D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
