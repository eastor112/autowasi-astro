import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7n8E7b0wtFEwSBS8oa5wVwshLXkOyvNY",
  authDomain: "todoautos.firebaseapp.com",
  projectId: "todoautos",
  storageBucket: "todoautos.appspot.com",
  messagingSenderId: "627443339943",
  appId: "1:627443339943:web:113de9723a94056e54c182"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);


export async function initializeFCM() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPI_KEY });
      if (currentToken) {
        const tokenId = currentToken.substring(0, 30);

        try {
          const userDocRef = doc(db, 'tokens', tokenId);
          await setDoc(userDocRef, { token: currentToken });
        } catch (error) {
          console.error('Error al almacenar el token en Firestore:', error);
        }
      } else {
        console.log('No se pudo obtener el token.');
      }
    } else {
      console.log('Permiso de notificación denegado');
    }
  } catch (error) {
    console.error('Error al inicializar FCM:', error);
  }
}


export function listenForMessages() {
  onMessage(messaging, (payload) => {
    const title = payload.notification?.title || "Notificación";
    const body = payload.notification?.body || "Has recibido una nueva notificación.";

    // Crear un elemento de alerta personalizado
    const alertElement = document.createElement('div');
    alertElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 15px;
      max-width: 300px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
    `;

    alertElement.innerHTML = `
      <h3 style="margin-top: 0; color: #333;">${title}</h3>
      <p style="margin-bottom: 10px; color: #666;">${body}</p>
      <button class="notification-button" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; cursor: pointer;">Cerrar</button>
    `;

    document.body.appendChild(alertElement);

    const closeButton = alertElement.querySelector<HTMLButtonElement>('.notification-button');
    if (closeButton) {
      closeButton.onclick = () => {
        document.body.removeChild(alertElement);
      };
    }

    setTimeout(() => {
      if (document.body.contains(alertElement)) {
        document.body.removeChild(alertElement);
      }
    }, 5000);
  });
}
