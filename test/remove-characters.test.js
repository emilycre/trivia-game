import { removeCharacters } from '../src/trivia-components.js';

const test = QUnit.test;

test('remove the word a from string', assert => {
    const inputString = 'A BANANA';
    const expected = 'BANANA';

    const result = removeCharacters(inputString);

    assert.equal(result, expected);
});

test('remove nothing from string', assert => {
    const inputString = 'GAMMA RAY';
    const expected = 'GAMMA RAY';

    const result = removeCharacters(inputString);

    assert.equal(result, expected);
});

test('remove the word the from string', assert => {
    const inputString = 'THE BANANA';
    const expected = 'BANANA';

    const result = removeCharacters(inputString);

    assert.equal(result, expected);
});

test('remove the word an from string', assert => {
    const inputString = 'AN APPLE';
    const expected = 'APPLE';

    const result = removeCharacters(inputString);

    assert.equal(result, expected);
});