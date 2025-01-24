import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuration for Patient App
const patientConfig = {
  apiKey: "AIzaSyAj53vCcwskQ_duPi-SLhhFzMXHvt8H59U",
  authDomain: "patientapp-b0f20.firebaseapp.com",
  databaseURL: "https://patientapp-b0f20-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patientapp-b0f20",
  storageBucket: "patientapp-b0f20.firebasestorage.app",
  messagingSenderId: "517171618079",
  appId: "1:517171618079:web:5637d97432fa71d4cf902a",
  measurementId: "G-NYYMXWPBPH"
};

// Configuration for WeCare App
const wecareConfig = {
  apiKey: "AIzaSyBAPOoxm20XDz9TP3w49u6mE0_KWzyW_f0",
  authDomain: "wecareapp-9a9f0.firebaseapp.com",
  databaseURL: "https://wecareapp-9a9f0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wecareapp-9a9f0",
  storageBucket: "wecareapp-9a9f0.firebasestorage.app",
  messagingSenderId: "1093270271150",
  appId: "1:1093270271150:web:b3f937b3bf91f36e69293f",
  measurementId: "G-70XG3Y4TB2"
};

// Initialize or get Patient App
const patientApp =
  getApps().find((app) => app.name === "patientApp") || initializeApp(patientConfig, "patientApp");
const patientDatabase = getDatabase(patientApp);

// Initialize or get WeCare App
const wecareApp =
  getApps().find((app) => app.name === "wecareApp") || initializeApp(wecareConfig, "wecareApp");
const wecareDatabase = getDatabase(wecareApp);

export { patientDatabase, wecareDatabase };
