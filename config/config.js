import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAsVAr-6qChqnLkbbrlbiJ6AmnWIMP9sU",
  authDomain: "photo-feed-385f5.firebaseapp.com",
  databaseURL: "https://photo-feed-385f5.firebaseio.com",
  projectId: "photo-feed-385f5",
  storageBucket: "photo-feed-385f5.appspot.com",
  messagingSenderId: "724254368452",
  appId: "1:724254368452:web:58d01b54548e18eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
