// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAPOoxm20XDz9TP3w49u6mE0_KWzyW_f0",
  authDomain: "wecareapp-9a9f0.firebaseapp.com",
  databaseURL: "https://wecareapp-9a9f0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wecareapp-9a9f0",
  storageBucket: "wecareapp-9a9f0.firebasestorage.app",
  messagingSenderId: "1093270271150",
  appId: "1:1093270271150:web:b3f937b3bf91f36e69293f",
  measurementId: "G-70XG3Y4TB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance
export const database = getDatabase(app);
