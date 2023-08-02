import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "./firebase_config";

import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp)

export default firestore