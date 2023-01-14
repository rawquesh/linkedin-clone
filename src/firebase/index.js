import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);

// exports
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
