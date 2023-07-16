
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAbEsfgPv8NxtqNzQIWGbhcONn3LOvWea4",
    authDomain: "foodapp2-3a233.firebaseapp.com",
    projectId: "foodapp2-3a233",
    storageBucket: "foodapp2-3a233.appspot.com",
    messagingSenderId: "876107566069",
    appId: "1:876107566069:web:72a9aae68922d1f026eebc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };