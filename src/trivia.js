import loadHeader from './load-header.js';
import { getQuestionFromArray } from './trivia-components.js';
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const currentQuestionNumberDisplay = document.getElementById('current-question-number-display');
const questionDisplay = document.getElementById('question-display');
const valueDisplay = document.getElementById('value');
const categoryDisplay = document.getElementById('category');
const answerDisplay = document.getElementById('answer-display');

const urlRandom = 'http://jservice.io/api/random?count=10';

let currentQuestionNumber = 0;
currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
let score = 0;


loadHeader();

fetch(urlRandom)
    .then(response => response.json())
    .then(randomQuestions => {
        populateQuestion(randomQuestions, currentQuestionNumber);
        submitButton.addEventListener('click', () => {
            const adjustedCorrectAnswer = answerDisplay.textContent.toUpperCase();
            const adjustedAnswer = userInput.value.toUpperCase();
            console.log(adjustedCorrectAnswer, adjustedAnswer);
            if(adjustedCorrectAnswer.includes(adjustedAnswer)){
                console.log('NICE');
            }
            userInput.value = '';
            //if currentQuestionNumber >= randomQuestions.length
            //redirect to results page
            currentQuestionNumber++;
            populateQuestion(randomQuestions, currentQuestionNumber);
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
}