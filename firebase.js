// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgPQBgEOVlkReSMcW7-nxkYi7RQy7WgvA",
  authDomain: "alamal-bucket.firebaseapp.com",
  projectId: "alamal-bucket",
  storageBucket: "alamal-bucket.appspot.com",
  messagingSenderId: "30533370990",
  appId: "1:30533370990:web:146a349b4bc30d2f70527f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
