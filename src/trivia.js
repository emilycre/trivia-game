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

const urlRandom = 'http://jservice.io/api/random?count=25';

let currentQuestionNumber = 0;
currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
let score = 0;


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
            console.log(adjustedCorrectAnswer, adjustedAnswer);
            if(adjustedAnswer === ''){
                //display fail message
                console.log('fail1');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            else if(adjustedAnswer.length < 0.9 * adjustedCorrectAnswer.length) {
                console.log('fail2');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            else if(adjustedCorrectAnswer.includes(adjustedAnswer)){
                console.log('NICE');
                score += question.score;
                scoreTotal.textContent = score;
            }
            else {
                //display fail message
                console.log('fail3');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            userInput.value = '';

            if(currentQuestionNumber >= 1) {
                auth.onAuthStateChanged(user => {
                    const targetUser = userRef.child(user.uid);
                    targetUser.once('value').then(snapshot => {
                        const value = snapshot.val();
                        if(score > value.highScore) {
                            userRef.child(user.uid)
                                .update({
                                    highScore: score
                                });  
                        }
                    });
                  
                    // window.location = './results.html';
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