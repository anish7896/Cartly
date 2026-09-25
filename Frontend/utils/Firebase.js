import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "logincartly-221a0.firebaseapp.com",
  projectId: "logincartly-221a0",
  storageBucket: "logincartly-221a0.firebasestorage.app",
  messagingSenderId: "368226357416",
  appId: "1:368226357416:web:b535f8ec7ca2772aa9729d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth, provider};
