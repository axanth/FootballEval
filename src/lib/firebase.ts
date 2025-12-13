import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaVqPwhwXjzdxMt2n39jaXIj1uCcIPw4g",
    authDomain: "football-eval.firebaseapp.com",
    projectId: "football-eval",
    storageBucket: "football-eval.firebasestorage.app",
    messagingSenderId: "794842256524",
    appId: "1:794842256524:web:c31ab339e5c7f8f0f197a9",
    measurementId: "G-9RW2FE3VLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Connect to Emulators if running locally
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    console.log("Using local Firestore emulator!");
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (e) {
        // Ignore if already connected
    }
}
