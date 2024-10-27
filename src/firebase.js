// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBMxlnu0RI4lQWHg2bi42SEIzDRT6uVs18",
    authDomain: "react-product-frontend.firebaseapp.com",
    projectId: "react-product-frontend",
    storageBucket: "react-product-frontend.appspot.com",
    messagingSenderId: "109690859458",
    appId: "1:109690859458:web:c6c1dd4a2103c3464c705b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider };
