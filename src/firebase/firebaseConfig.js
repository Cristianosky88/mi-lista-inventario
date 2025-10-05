// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASGB9jSKotUDSP8LDkj6uaNSBZ6Z6k2jw",
  authDomain: "crud-spa-f04b4.firebaseapp.com",
  projectId: "crud-spa-f04b4",
  storageBucket: "crud-spa-f04b4.firebasestorage.app",
  messagingSenderId: "105152236293",
  appId: "1:105152236293:web:ac7a3a55fd7b138e8a056c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
