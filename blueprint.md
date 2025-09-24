# Project Blueprint: The Digital Dungeon

## 1. Project Overview

The Digital Dungeon is a web-based application designed to facilitate Dungeons & Dragons (D&D) gameplay. It provides a platform for players to create, join, and participate in D&D games in a digital environment. The application features a dark fantasy theme to create an immersive experience for the players.

## 2. Design Guidelines

The application follows a modern, dark-fantasy design aesthetic.

*   **Theme**: Dark, immersive, and inspired by classic fantasy RPGs.
*   **Primary Color**: `BlueViolet` (`#8A2BE2`)
*   **Secondary Color**: `DarkSlateBlue` (`#483D8B`)
*   **Background Color**: Dark gray (`#1a1a1a`)
*   **Surface Color**: Slightly lighter gray (`#2c2c2c`)
*   **Text Color**: Off-white (`#f0f0f0`)
*   **Typography**:
    *   **Headings**: `MedievalSharp`, a gothic-style font, is used for main titles to evoke a fantasy feel.
    *   **Body Text**: `Roboto`, a clean and readable sans-serif font, is used for body text and UI elements.
*   **Interactivity**: UI elements such as buttons and forms have hover effects and subtle animations to provide user feedback.
*   **Iconography**: The Font Awesome library is included for easy use of icons to improve UI clarity.

## 3. Web Components

The application uses Web Components to create reusable UI elements.

*   **Character Sheet** (`<character-sheet>`): A component to display character information.
*   **Chat Box** (`<chat-box>`): A real-time chat component using Firebase Firestore.
*   **Dice Roller** (`<dice-roller>`): An interactive dice roller.

## 4. Firebase V9 Migration & Authentication Fix

*   **Problem**: Users encountered a black screen after registering a new account, and authentication was generally unstable.
*   **Root Cause**: The application was using the outdated, non-modular Firebase v8 SDK, and the HTML files contained conflicting Firebase scripts.
*   **Solution**:
    1.  **Migrated to Firebase v9**: Refactored `firebase.js`, `auth.js`, `games.js`, and `game.js` to use the modern, modular Firebase v9 SDK.
    2.  **Removed Conflicting Scripts**: Deleted the old Firebase v8 `compat` scripts from `auth.html`, `games.html`, and `game.html` to resolve conflicts.
    3.  **Updated Firestore Rules**: Ensured `firestore.rules` were correctly configured to allow read/write access to the database.

## 5. Implemented Features

### 5.1. Landing Page

*   **File**: `index.html`
*   **Styling**: `landing.css`
*   **Functionality**:
    *   Serves as the initial entry point for the application.
    *   Displays a welcome message with the application's title and a tagline.
    *   Includes a button that navigates users to the authentication page.

### 5.2. User Authentication

*   **File**: `auth.html`
*   **Styling**: `auth.css`
*   **Functionality**:
    *   Provides forms for user registration and login.
    *   Uses Firebase Authentication for user management.
    *   Features a rotating 3D effect to switch between the login and registration forms.

### 5.3. Game Lobby

*   **File**: `games.html`
*   **Styling**: `games.css`
*   **Functionality**:
    *   Displays a list of games the user has joined.
    *   Allows users to create a new game.
    *   Allows users to join an existing game using a join code.
    *   Provides a logout button.

### 5.4. Game View

*   **File**: `game.html`
*   **Styling**: `game.css`
*   **Functionality**:
    *   The main game interface.
    *   Displays the game title.
    *   Includes a button to navigate back to the game lobby.
    *   Integrates the `character-sheet`, `chat-box`, and `dice-roller` web components.

## 6. File Structure

```
.
├── index.html
├── landing.css
├── auth.html
├── auth.css
├── auth.js
├── games.html
├── games.css
├── games.js
├── game.html
├── game.css
├── game.js
├── style.css
├── firebase.js
├── firestore.rules
├── firebase.json
├── blueprint.md
└── components
    ├── character-sheet.css
    ├── character-sheet.js
    ├── chat-box.css
    ├── chat-box.js
    ├── dice-roller.css
    └── dice-roller.js
```
