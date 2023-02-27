import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:
        'https://marina-labella-app-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'marina-labella-app',
    storageBucket: 'marina-labella-app.appspot.com',
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: 'G-Y7FE0G104R',
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};
