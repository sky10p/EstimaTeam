// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOX7wolUrHpdpG1zTlioIG91XBZkS85n4",
  authDomain: "estimateam-fb1d3.firebaseapp.com",
  databaseURL: "https://estimateam-fb1d3-default-rtdb.firebaseio.com",
  projectId: "estimateam-fb1d3",
  storageBucket: "estimateam-fb1d3.appspot.com",
  messagingSenderId: "366570368330",
  appId: "1:366570368330:web:3f41db78aacac0c808a5b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authenticate = async () => {
  const auth = getAuth(app);
  if (auth.currentUser === null) {
    const user = await signInAnonymously(auth);
    return user.user.uid;
  }
  return auth.currentUser.uid;
};
