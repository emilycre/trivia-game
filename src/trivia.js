import loadHeader from './load-header.js';
import { getQuestionFromArray } from './trivia-components.js';
import { filterQuestions, removeCharacters } from './trivia-components.js';
import { db, userRef, auth, scoresRef } from './firebase.js';
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const currentQuestionNumberDisplay = document.getElementById('current-question-number-display');
const questionDisplay = document.getElementById('question-display');
const valueDisplay = document.getElementById('value');
const categoryDisplay = document.getElementById('category');
const answerDisplay = document.getElementById('answer-display');
const scoreTotal = document.getElementById('score-total');
const resultUserAnswer = document.getElementById('result-user-answer');
const resultCondition = document.getElementById('result-condition');
const resultExpectedAnswer = document.getElementById('result-expected-answer');

const urlRandom = 'http://jservice.io/api/random?count=25';

let currentQuestionNumber = 0;
currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
let score = 0;
let failureNumber = 0;
loadHeader();

fetch(urlRandom)
    .then(response => response.json())
    .then(fetchedQuestions => {
        const randomQuestions = filterQuestions(fetchedQuestions);
        let question = populateQuestion(randomQuestions, currentQuestionNumber);
        submitButton.addEventListener('click', () => {
            let adjustedCorrectAnswer = question.answer.toUpperCase();
            adjustedCorrectAnswer = removeCharacters(adjustedCorrectAnswer);
            let adjustedAnswer = userInput.value.toUpperCase();
            adjustedAnswer = removeCharacters(adjustedAnswer);
            resultExpectedAnswer.textContent = adjustedCorrectAnswer;
            resultUserAnswer.textContent = adjustedAnswer;
            if(adjustedAnswer === ''){
                resultCondition.textContent = 'TRY ACTUALLY ANSWERING THE QUESTION...';
                score -= question.score;
                scoreTotal.textContent = score;
                failureNumber++;
            }
            else if(adjustedAnswer.length < 0.9 * adjustedCorrectAnswer.length) {
                resultCondition.textContent = 'INCORRECT';
                score -= question.score;
                scoreTotal.textContent = score;
                failureNumber++;
            }
            else if(adjustedCorrectAnswer.includes(adjustedAnswer)){
                resultCondition.textContent = 'CORRECT';
                score += question.score;
                scoreTotal.textContent = score;
            }
            else {
                resultCondition.textContent = 'INCORRECT';
                score -= question.score;
                scoreTotal.textContent = score;
                failureNumber++;
            }
            userInput.value = '';

            if(failureNumber >= 3) {
                auth.onAuthStateChanged(user => {

                    const targetScores = scoresRef.child(user.uid);
                    targetScores.once('value').then(snapshot => {
                        const value = snapshot.val();

                        if(!value){
                            scoresRef.child(user.uid)
                                .set({
                                    highScore: score,
                                    name: user.displayName
                                });
                            
                        }
                        else if(score > value.highScore) {
                            scoresRef.child(user.uid)
                                .set({
                                    highScore: score,
                                    name: user.displayName
                                });  
                        }
                    });
                  
                    window.location = './results.html';
                });
                
            }
            currentQuestionNumber++;
            question = populateQuestion(randomQuestions, currentQuestionNumber);
        });
    });

function populateQuestion(randomQuestions, currentQuestionNumber) {
    currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
    const question = getQuestionFromArray(randomQuestions, currentQuestionNumber);
    console.log(question);
    questionDisplay.textContent = question.question;
    valueDisplay.textContent = question.score;
    categoryDisplay.textContent = question.category;
    answerDisplay.textContent = question.answer;
    return question;
}