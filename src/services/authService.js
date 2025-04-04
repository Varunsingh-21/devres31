import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export const registerUser = async (email, password, name, role = "user") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    name,
    email,
    role,               // "user" or "admin"
    banned: false,
    reputation: 0,
    totalPosted: 0,
    totalSolved: 0,
    createdAt: serverTimestamp()
  });

  return uid;
};
