const test = QUnit.test;
import fetchedQuestions from '../data/fake-data.js';
import expected from '../data/fake-expected.js';
import { filterQuestions } from '../src/trivia-components.js';


test('filter unusable questions', assert => {
    //arrange
    //act
    const result = filterQuestions(fetchedQuestions);
    //assert
    assert.deepEqual(result, expected);
});