// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "upload-photos-473b2.firebaseapp.com",
  projectId: "upload-photos-473b2",
  storageBucket: "upload-photos-473b2.appspot.com",
  messagingSenderId: "476998630674",
  appId: "1:476998630674:web:4ca9de07ac47ec6ab647cb",
  measurementId: "G-8SWNPK0QNM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
