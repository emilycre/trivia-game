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
const resultBox = document.getElementById('result-section');
const resultUserAnswer = document.getElementById('result-user-answer');
const resultCondition = document.getElementById('result-condition');
const resultExpectedAnswer = document.getElementById('result-expected-answer');

const urlRandom = 'http://jservice.io/api/random?count=100';

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
        console.log(question.answer);
        
        submitButton.addEventListener('click', () => {
            resultBox.classList.remove('hidden');
            resultBox.classList.add('visible');
            const adjustedAnswer = adjustAnswer();
            const adjustedCorrectAnswer = adjustCorrectAnswer(question);
            evaluateAnswer(adjustedAnswer, adjustedCorrectAnswer, question);
            userInput.value = '';
            
            setTimeout(() => {
                resultBox.classList.add('hidden');
                resultBox.classList.remove('visible');
            }, 4000);
            
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
                    // window.location = './scoreboard.html';
                });
                
            }
            
            currentQuestionNumber++;
            question = populateQuestion(randomQuestions, currentQuestionNumber);
            console.log(question.answer);
        });
    });
    
function populateQuestion(randomQuestions, currentQuestionNumber) {
    currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
    const question = getQuestionFromArray(randomQuestions, currentQuestionNumber);
    questionDisplay.textContent = question.question;
    valueDisplay.textContent = question.score;
    categoryDisplay.textContent = question.category;
    answerDisplay.textContent = question.answer;
    return question;
}

function adjustCorrectAnswer(question) {
    let adjustedCorrectAnswer = question.answer.toUpperCase();
    adjustedCorrectAnswer = removeCharacters(adjustedCorrectAnswer);
    resultExpectedAnswer.textContent = adjustedCorrectAnswer;
    return adjustedCorrectAnswer;
}
function adjustAnswer() {
    let adjustedAnswer = userInput.value.toUpperCase();
    adjustedAnswer = removeCharacters(adjustedAnswer);
    resultUserAnswer.textContent = adjustedAnswer;
    return adjustedAnswer;
}

function evaluateAnswer(adjustedAnswer, adjustedCorrectAnswer, question){
    if(adjustedAnswer === ''){
        resultCondition.textContent = 'NOT AN ANSWER, TRY ACTUALLY ANSWERING THE QUESTION...';
        scoreTotal.textContent = score;
        failureNumber++;
    }
    else if(adjustedAnswer.length < 0.8 * adjustedCorrectAnswer.length) {
        resultCondition.textContent = 'INCORRECT';
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
        scoreTotal.textContent = score;
        failureNumber++;
    }
}