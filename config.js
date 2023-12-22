import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyARFaQ5GxTbbkmXNXFdx31xiPkFsvFHPnA",
  authDomain: "login-app-2e9b5.firebaseapp.com",
  projectId: "login-app-2e9b5",
  storageBucket: "login-app-2e9b5.appspot.com",
  messagingSenderId: "745436894013",
  appId: "1:745436894013:web:ef8686edeb56f303e4eb54"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);