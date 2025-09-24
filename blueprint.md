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

## 3. Implemented Features

### 3.1. Landing Page

*   **File**: `index.html`
*   **Styling**: `landing.css`
*   **Functionality**:
    *   Serves as the initial entry point for the application.
    *   Displays a welcome message with the application's title and a tagline.
    *   Includes a button that navigates users to the authentication page.

### 3.2. User Authentication

*   **File**: `auth.html`
*   **Styling**: `auth.css`
*   **Functionality**:
    *   Provides forms for user registration and login.
    *   Uses Firebase Authentication for user management.
    *   Features a rotating 3D effect to switch between the login and registration forms.

### 3.3. Game Lobby

*   **File**: `games.html`
*   **Styling**: `games.css`
*   **Functionality**:
    *   Displays a list of games the user has joined.
    *   Allows users to create a new game.
    *   Allows users to join an existing game using a join code.
    *   Provides a logout button.

### 3.4. Game View

*   **File**: `game.html`
*   **Styling**: `game.css`
*   **Functionality**:
    *   The basic layout for the main game interface.
    *   Displays the game title.
    *   Includes a button to navigate back to the game lobby.
    *   The layout is divided into a main game board area and a side panel for character sheets and chat.

## 4. File Structure

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
├── main.js
├── style.css
├── firebase-config.js
├── blueprint.md
└── .firebaserc
```
