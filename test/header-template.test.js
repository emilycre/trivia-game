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
    <span id="high-score">High-Score: 2000</span>
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
                <h1>Just Guess</h1>
                <div id="nav-container">
                    <a href="index.html" class="nav-link">Home</a>
                    <div id="play-button">
                        <a href="trivia.html" class="nav-link" id="trivia-button">Play</a>
                        <ul class="drop-down-content">
                            <li><a href="trivia.html#random">Play</a></li>
                            <li><a href="trivia.html#easy">Play Easy</a></li>
                            <li><a href="trivia.html#medium">Play Medium</a></li>
                            <li><a href="trivia.html#hard">Play Hard</a></li>
                        </ul>
                    </div>
                    <a href="scoreboard.html" class="nav-link">High Scores</a>
                </div>
            </div>
        </header>
    `;
    const result = makeHeaderTemplate();

    assert.htmlEqual(result, expected);
});