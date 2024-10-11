// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/*
const firebaseConfig = {
  apiKey: "AIzaSyALCaRBcMpRzGAnM1Dros0HaOgaISbvo_c",
  authDomain: "wedding-11f86.firebaseapp.com",
  projectId: "wedding-11f86",
  storageBucket: "wedding-11f86.appspot.com",
  messagingSenderId: "428557040728",
  appId: "1:428557040728:web:ba300a3d3021b1ae9cde2d",
  measurementId: "G-KPLE4ZPDNX"
};
*/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };