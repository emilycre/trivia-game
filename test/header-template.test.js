const test = QUnit.test;

QUnit.module('header');

import { makeHeaderTemplate, makeProfile } from '../src/load-header.js';

test('user profile template', function(assert) {
    const expected = `
    <div id="profile-box">
    <img src="./assets/auth.jpeg" id="user-image">
    
    <div id="user-info">
    <span id="user-name">Banana Man</span>
    <div id="score-sign-out">
    <span id="high-score">HI-SCORE:2000</span>
    </div>
    <button id="sign-out">Sign Out</button>
    </div>
    </div>
    `;
    const userHighScore = 2000;
    const user = {
        displayName: 'Banana Man',
        photoURL: './assets/auth.jpeg',
    };

    const result = makeProfile(user, userHighScore);

    assert.htmlEqual(result, expected);
});

test('make header template', function(assert) {
    const expected = `
    <header>
    <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
    <div id="center-header">
        <h1>Trivia Game</h1>
        <div id="nav-container">
            <a href="index.html" class="nav-link">Home</a>
            <a href="trivia.html" class="nav-link">Play</a>
            <a href="scoreboard.html" class="nav-link">High Scores</a>
        </div>
    </div>
    </header>
    `;
    const result = makeHeaderTemplate();

    assert.htmlEqual(result, expected);
});