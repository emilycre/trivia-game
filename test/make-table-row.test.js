const test = QUnit.test;


QUnit.module('makes table row');

import { makeHighScoreRow } from '../src/scoreboard-components.js';

test('dynamically creates table row from array entry', assert => {
    const scoreEntry = {
        highScore: 1000000, 
        name: 'Bob Bobson'
    };
    const entryRank = 1;
    const result = makeHighScoreRow(scoreEntry, entryRank) ;
    const expected = /*html*/ `
    <tr>
        <td>1.</td>
        <td>Bob Bobson</td>
        <td>1000000</td>
    </tr>
    `;
    assert.htmlEqual(result, expected);
});