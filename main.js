import firebaseConfig from './firebase-config.js';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (user) {
        // If the user is on the auth page, redirect to the games page.
        if (window.location.pathname.includes('auth.html')) {
            window.location.href = 'games.html';
        }
    } 
});