
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "post-now-01.firebaseapp.com",
  projectId: "post-now-01",
  storageBucket: "post-now-01.appspot.com",
  messagingSenderId: "318133714655",
  appId: "1:318133714655:web:8bd54985ec82c52776736a"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()
export {app, db, storage};