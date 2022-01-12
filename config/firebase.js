import firebase from '@firebase/app';
import '@firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBBha89PPBWeSkyUaHlJ9m3ePqEsWWWUpQ',
  authDomain: 'mad-project-d6af7.firebaseapp.com',
  databaseURL: 'https://mad-project-d6af7-default-rtdb.firebaseio.com',
  projectId: 'mad-project-d6af7',
  storageBucket: 'mad-project-d6af7.appspot.com',
  messagingSenderId: '668118336886',
  appId: '1:668118336886:web:c1556890759c27922c2657',
  measurementId: 'G-3DZDHV5GM7',
};

var Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app();
}

export default Firebase;
