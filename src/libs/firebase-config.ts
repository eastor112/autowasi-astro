import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD7n8E7b0wtFEwSBS8oa5wVwshLXkOyvNY",
  authDomain: "todoautos.firebaseapp.com",
  projectId: "todoautos",
  storageBucket: "todoautos.appspot.com",
  messagingSenderId: "627443339943",
  appId: "1:627443339943:web:113de9723a94056e54c182"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage }
