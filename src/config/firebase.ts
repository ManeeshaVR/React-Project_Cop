// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC-Kd6MaX7jiwLLKTrg_AjTNW4UNWDqJWU",
    authDomain: "react-pos-384d6.firebaseapp.com",
    projectId: "react-pos-384d6",
    storageBucket: "react-pos-384d6.appspot.com",
    messagingSenderId: "466071753706",
    appId: "1:466071753706:web:6cc19d893a7b3e5f569893",
    measurementId: "G-QC9G92HYND"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage();
export default firebase;