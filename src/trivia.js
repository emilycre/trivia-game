import loadHeader from './load-header.js';
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const currentQuestionDisplay = document.getElementById('current-question-display');


const urlRandom = 'http://jservice.io/api/random?count=10';

let currentQuestion = 0;
let score = 0;

loadHeader();

fetch(urlRandom)
    .then(response => response.json())
    .then(randomQuestions => {
        console.log(randomQuestions);
    });


submitButton.addEventListener('click', () => {
    const userAnswer = userInput.value;

});

