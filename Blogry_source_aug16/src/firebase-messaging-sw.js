importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCzKjWo90FTLzb3PDBexJZ1LMguuMWBPkI",
  authDomain: "blogry-f8484.firebaseapp.com",
  projectId: "blogry-f8484",
  storageBucket: "blogry-f8484.appspot.com",
  messagingSenderId: "76208028891",
  appId: "1:76208028891:web:0080414276d902f88ea0fe",
  measurementId: "G-4ELR1W42Z6"
});
const messaging = firebase.messaging();
