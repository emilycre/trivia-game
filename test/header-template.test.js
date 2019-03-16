const test = QUnit.test;

QUnit.module('header');

import { makeHeaderTemplate } from '../src/load-header.js';

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