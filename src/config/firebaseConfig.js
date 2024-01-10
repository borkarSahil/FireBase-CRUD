// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Our Code
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// DataBase FireStore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_xnZnPmyDPdPfQAOBk2qyq640NFnsUrM",
  authDomain: "crud-6ac5a.firebaseapp.com",
  projectId: "crud-6ac5a",
  storageBucket: "crud-6ac5a.appspot.com",
  messagingSenderId: "51967667162",
  appId: "1:51967667162:web:31e10f57d85040dd79aee3",
  measurementId: "G-55PRR4VRKG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fireStoreDB = getFirestore(app);
