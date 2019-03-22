import fetchedQuestions, { hardFetchedQuestions } from '../data/fake-data.js';
import { easyQuestions, mediumQuestions, hardQuestions } from '../data/difficulty-filtered-expected.js';
import { filterByEasy, filterByMedium, filterByHard } from '../src/filter-by-difficulty.js';

const test = QUnit.test;

QUnit.module('difficuly filters');

test('filter for easy questions', assert => {
    const expected = easyQuestions;

    const result = filterByEasy(fetchedQuestions);

    assert.deepEqual(result, expected);
});

test('filter By medium questions', assert => {
    const expected = mediumQuestions;

    const result = filterByMedium(fetchedQuestions);

    assert.deepEqual(result, expected);
});

test('filter By difficult questions', assert => {
    const expected = hardQuestions;

    const result = filterByHard(hardFetchedQuestions);

    assert.deepEqual(result, expected);
});