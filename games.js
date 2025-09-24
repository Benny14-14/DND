import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const createGameButton = document.getElementById('create-game-button');
const joinGameButton = document.getElementById('join-game-button');
const gamesList = document.getElementById('games');
const logoutButton = document.getElementById('logout-button');
const welcomeMessage = document.getElementById('welcome-message');

onAuthStateChanged(auth, user => {
    if (user) {
        if (user.displayName) {
            welcomeMessage.textContent = `Welcome, ${user.displayName}!`;
        } else {
            welcomeMessage.textContent = 'Welcome!';
        }
        loadGames(user.uid);
    } else {
        window.location.href = 'auth.html';
    }
});

function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

createGameButton.addEventListener('click', () => {
    const gameName = document.getElementById('game-name').value;
    const user = auth.currentUser;
    if (gameName && user) {
        const joinCode = generateJoinCode();
        addDoc(collection(db, 'games'), {
            name: gameName,
            owner: user.uid,
            joinCode: joinCode,
            players: [user.uid]
        })
        .then(() => {
            document.getElementById('game-name').value = '';
        });
    }
});

joinGameButton.addEventListener('click', () => {
    const joinCode = document.getElementById('join-code').value;
    const user = auth.currentUser;
    if (joinCode && user) {
        const q = query(collection(db, 'games'), where('joinCode', '==', joinCode));
        getDocs(q)
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const gameDoc = querySnapshot.docs[0];
                    updateDoc(gameDoc.ref, {
                        players: arrayUnion(user.uid)
                    })
                    .then(() => {
                        document.getElementById('join-code').value = '';
                    });
                } else {
                    alert('Invalid Join Code');
                }
            });
    }
});

function loadGames(userId) {
    const q = query(collection(db, 'games'), where('players', 'array-contains', userId));
    onSnapshot(q, querySnapshot => {
        gamesList.innerHTML = '';
        querySnapshot.forEach(doc => {
            const game = doc.data();
            const li = document.createElement('li');
            li.dataset.gameId = doc.id;

            const gameName = document.createElement('span');
            gameName.textContent = game.name;

            const joinCode = document.createElement('span');
            joinCode.className = 'join-code';
            joinCode.textContent = `Code: ${game.joinCode}`;

            li.appendChild(gameName);
            li.appendChild(joinCode);

            li.addEventListener('click', () => {
                window.location.href = `game.html?gameId=${doc.id}`;
            });
            gamesList.appendChild(li);
        });
    });
}

logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'auth.html';
    });
});
