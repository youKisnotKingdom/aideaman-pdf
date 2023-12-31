import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "./firebase_config";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import { getAuth } from "firebase/auth"

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp)

export const firestorage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp)
