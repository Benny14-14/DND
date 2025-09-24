import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
    doc,
    getDoc,
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

function getGameId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('gameId');
}

function rollDice(dice) {
    const sides = parseInt(dice.substring(1));
    return Math.floor(Math.random() * sides) + 1;
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, user => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }

        const gameId = getGameId();
        if (!gameId) {
            window.location.href = 'games.html';
            return;
        }

        const gameRef = doc(db, 'games', gameId);
        const chatBox = document.querySelector('chat-box');
        const diceRoller = document.querySelector('dice-roller');

        getDoc(gameRef).then(docSnap => {
            if (docSnap.exists()) {
                document.getElementById('game-title').textContent = docSnap.data().name;
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

        const messagesRef = collection(db, 'games', gameId, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        onSnapshot(q, snapshot => {
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
                addDoc(messagesRef, {
                    text,
                    sender: {
                        uid: user.uid,
                        displayName: user.displayName
                    },
                    timestamp: serverTimestamp()
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

                addDoc(messagesRef, {
                    text: `rolled a ${dice} and got ${result}`,
                    sender: {
                        uid: user.uid,
                        displayName: user.displayName
                    },
                    timestamp: serverTimestamp()
                });
            });
        });
    });
});
