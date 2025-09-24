import firebaseConfig from './firebase-config.js';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

const createGameButton = document.getElementById('create-game-button');
const joinGameButton = document.getElementById('join-game-button');
const gamesList = document.getElementById('games');
const logoutButton = document.getElementById('logout-button');

auth.onAuthStateChanged(user => {
    if (user) {
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
        db.collection('games').add({
            name: gameName,
            owner: user.uid,
            joinCode: joinCode,
            players: [user.uid]
        })
        .then(() => {
            document.getElementById('game-name').value = '';
            loadGames(user.uid);
        });
    }
});

joinGameButton.addEventListener('click', () => {
    const joinCode = document.getElementById('join-code').value;
    const user = auth.currentUser;
    if (joinCode && user) {
        db.collection('games').where('joinCode', '==', joinCode).get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const gameDoc = querySnapshot.docs[0];
                    gameDoc.ref.update({
                        players: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    })
                    .then(() => {
                        document.getElementById('join-code').value = '';
                        loadGames(user.uid);
                    });
                } else {
                    alert('Invalid Join Code');
                }
            });
    }
});

function loadGames(userId) {
    db.collection('games').where('players', 'array-contains', userId).onSnapshot(querySnapshot => {
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
    auth.signOut().then(() => {
        window.location.href = 'auth.html';
    });
});
