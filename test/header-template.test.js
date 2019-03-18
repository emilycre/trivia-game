const test = QUnit.test;

QUnit.module('header');

import { makeHeaderTemplate, makeProfile } from '../src/load-header.js';

test('user profile template', function(assert) {
    const expected = `
        <div>
            <img src="./assets/auth.jpeg" id="user-image">
            <span id="user-name">Banana Man</span>
            <button id="sign-out">Sign Out</button>
        </div>
    `;

    const user = {
        displayName: 'Banana Man',
        photoURL: './assets/auth.jpeg'
    };

    const result = makeProfile(user);

    assert.htmlEqual(result, expected);
});

test('make header template', function(assert) {
    const expected = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <h1>Trivia Game</h1>
        </header>
    `;
    const result = makeHeaderTemplate();

    assert.htmlEqual(result, expected);
});