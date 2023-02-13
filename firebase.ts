// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRvQ1uTQ23XDGq_tE3AuPgv3FTbfwi-Xs",
  authDomain: "in-clone-ebca6.firebaseapp.com",
  projectId: "in-clone-ebca6",
  storageBucket: "in-clone-ebca6.appspot.com",
  messagingSenderId: "749348381570",
  appId: "1:749348381570:web:0e28c609dada3ca7a9259b",
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage(app)
export { db, storage }
