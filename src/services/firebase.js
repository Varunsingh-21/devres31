import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyARV1PrWceVngpWO5eX4GjjNnrGZa1xtPA",
  authDomain: "devresolve-b9b3b.firebaseapp.com",
  projectId: "devresolve-b9b3b",
  storageBucket: "devresolve-b9b3b.firebasestorage.app",
  messagingSenderId: "573292532966",
  appId: "1:573292532966:web:4ef5dd7d3768ab81ead727",
  measurementId: "G-0ME476RPXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set local persistence
setPersistence(auth, browserSessionPersistence)
.then(() => console.log("✅ Firebase auth persistence set to session"))
.catch((error) => console.error("❌ Failed to set auth persistence", error));

export { auth, db };
