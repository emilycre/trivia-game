const test = QUnit.test;

QUnit.module('first trivia game');
import { getQuestionFromArray } from '../src/trivia-components.js';

test('creates question dynamically if given an input number', assert => {
    //arrange
    const questionArray = [
        { id: 77337, answer: 'Fisherman\'s Wharf', question: 'This historic San Francisco waterfront is famed for its dungeness crab', value: 800, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77843, answer: 'Gemini', question: 'The 2 brightest stars in this constellation are Castor & Pollux', value: null, airdate: '2007-05-23T12:00:00.000Z' },
        { id: 77338, answer: 'the mantle', question: 'According to plate tectonics theory, there are man… consisting of the crust & the upper part of this', value: 1000, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77339, answer: '<i>Alien</i>', question: 'In this 1979 film, the mining ship Nostromo lands … distant planet to investigate a suspected S.O.S.', value: 1000, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77340, answer: 'egg', question: 'This ingredient makes a Caesar salad especially likely to come, see & conquer you with Salmonella', value: 1000, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77341, answer: '(Samuel) Beckett', question: 'In 1928 he moved to Paris & met fellow Irish write…s Joyce, with whom he formed a lasting friendship', value: null, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77342, answer: 'wards', question: 'In Chicago Joe Rostenkowski was boss of the 32nd of these political divisions', value: 1000, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77343, answer: 'Lloyd\'s of London', question: 'This association of British insurance underwriters began in 1688', value: 1000, airdate: '2007-06-15T12:00:00.000Z' },
        { id: 77344, answer: 'William Sherman', question: '1865: Everyone talks about my "march to the sea", …rip through the Carolinas ain\'t no picnic, either', value: 200, airdate: '2007-06-14T12:00:00.000Z' }
    ];
    const currentQuestion = 2;
    //act
    const result = getQuestionFromArray(questionArray, currentQuestion);
    const expected = 'According to plate tectonics theory, there are man… consisting of the crust & the upper part of this';
    assert.equal(result, expected);
});