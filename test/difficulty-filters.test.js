import fetchedQuestions, { hardFetchedQuestions } from '../data/fake-data.js';
import { easyQuestions, mediumQuestions, hardQuestions } from '../data/difficulty-filtered-expected.js';
import { filterForEasy, filterForMedium, filterForHard } from '../src/filter-by-difficulty.js';

const test = QUnit.test;

QUnit.module('difficuly filters');

test('filter for easy questions', assert => {
    const expected = easyQuestions;

    const result = filterForEasy(fetchedQuestions);

    assert.deepEqual(result, expected);
});

test('filter for medium questions', assert => {
    const expected = mediumQuestions;

    const result = filterForMedium(fetchedQuestions);

    assert.deepEqual(result, expected);
});

test('filter for difficult questions', assert => {
    const expected = hardQuestions;

    const result = filterForHard(hardFetchedQuestions);

    assert.deepEqual(result, expected);
});