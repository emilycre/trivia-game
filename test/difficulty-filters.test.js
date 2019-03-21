import fetchedQuestions from '../data/fake-data.js';
import { easyQuestions, mediumQuestions } from '../data/difficulty-filtered-expected.js';

const test = QUnit.test;

QUnit.module('difficuly filters');

function filterForEasy(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 400 && question.value) {
            return question;
        }
    });
}

function filterForMedium(allQuestions) {
    return allQuestions.filter(question => {
        if(question.value < 800 && question.value > 300) {
            return question;
        }
    });
}

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

