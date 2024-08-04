/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD7n8E7b0wtFEwSBS8oa5wVwshLXkOyvNY",
  authDomain: "todoautos.firebaseapp.com",
  projectId: "todoautos",
  storageBucket: "todoautos.appspot.com",
  messagingSenderId: "627443339943",
  appId: "1:627443339943:web:113de9723a94056e54c182"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("executed");
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes un nuevo mensaje',
    icon: payload.notification?.icon || '/img/autowasi-logo.png',
    badge: '/img/autowasi-logo.png',
    tag: 'notification-' + Date.now(),
    data: payload.data,
    actions: [
      { action: 'open', title: 'Abrir' },
      { action: 'close', title: 'Cerrar' }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notificación clickeada', event);

  event.notification.close();

  if (event.action === 'open') {
    console.log('Acción "Abrir" seleccionada');
    event.waitUntil(clients.openWindow('https://www.google.com.pe/?hl=es'));
  } else if (event.action === 'close') {
    console.log('Acción "Cerrar" seleccionada');
  } else {
    console.log('Clic general en la notificación');
    event.waitUntil(clients.openWindow('https://www.google.com.pe/?hl=es'));
  }
});
