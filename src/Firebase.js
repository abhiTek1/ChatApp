// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfloH3VqviMVtZVfZnQnK6PmhjJEcXtEw",
  authDomain: "webchat-bd022.firebaseapp.com",
  projectId: "webchat-bd022",
  storageBucket: "webchat-bd022.appspot.com",
  messagingSenderId: "116178476029",
  appId: "1:116178476029:web:13794db376cf42dc8a9794"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
 const storage = getStorage(app);
  const db = getFirestore(app);
   
   
export{ app ,auth ,db,storage};
