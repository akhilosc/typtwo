import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCZwoA2RLtkg-J14ppjqZnEOPN-Dn7oNU",
  authDomain: "typtwo-c4a5e.firebaseapp.com",
  projectId: "typtwo-c4a5e",
  storageBucket: "typtwo-c4a5e.firebasestorage.app",
  messagingSenderId: "470068603029",
  appId: "1:470068603029:web:a8d7b6f416ae984181539c",
  measurementId: "G-268ESWHW5V"
};

// Initialize Firebase safely for SSR & client
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
