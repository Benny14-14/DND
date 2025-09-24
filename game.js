import firebaseConfig from './firebase-config.js';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

function getGameId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('gameId');
}

function rollDice(dice) {
    const sides = parseInt(dice.substring(1));
    return Math.floor(Math.random() * sides) + 1;
}

document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }

        const gameId = getGameId();
        if (!gameId) {
            window.location.href = 'games.html';
            return;
        }

        const gameRef = db.collection('games').doc(gameId);
        const chatBox = document.querySelector('chat-box');
        const diceRoller = document.querySelector('dice-roller');

        gameRef.get().then(doc => {
            if (doc.exists) {
                document.getElementById('game-title').textContent = doc.data().name;
            } else {
                console.error('Game not found');
                window.location.href = 'games.html';
            }
        }).catch(error => {
            console.error('Error getting game:', error);
        });

        document.getElementById('back-to-lobby').addEventListener('click', () => {
            window.location.href = 'games.html';
        });

        const messagesRef = gameRef.collection('messages').orderBy('timestamp');
        messagesRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const message = change.doc.data();
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('chat-message');
                    messageElement.innerHTML = `
                        <strong>${message.sender.displayName}</strong>
                        <span>${message.text}</span>
                    `;
                    chatBox.shadowRoot.querySelector('.chat-messages').prepend(messageElement);
                }
            });
        });

        chatBox.shadowRoot.querySelector('button').addEventListener('click', () => {
            const input = chatBox.shadowRoot.querySelector('input');
            const text = input.value.trim();
            if (text) {
                messagesRef.add({
                    text,
                    sender: {
                        uid: user.uid,
                        displayName: user.displayName
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                input.value = '';
            }
        });

        diceRoller.shadowRoot.querySelectorAll('.dice-buttons button').forEach(button => {
            button.addEventListener('click', () => {
                const dice = button.dataset.dice;
                const result = rollDice(dice);
                const resultElement = diceRoller.shadowRoot.querySelector('.roll-result');
                resultElement.textContent = `You rolled a ${result} on a ${dice}`;

                messagesRef.add({
                    text: `rolled a ${dice} and got ${result}`,
                    sender: {
                        uid: user.uid,
                        displayName: user.displayName
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
        });
    });
});
