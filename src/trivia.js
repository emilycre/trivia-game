import loadHeader from './load-header.js';
import { getQuestionFromArray } from './trivia-components.js';
import { filterQuestions, removeCharacters } from './trivia-components.js';
import { userRef, auth, scoresRef } from './firebase.js';
import { filterByEasy, filterByMedium, filterByHard } from './filter-by-difficulty.js';
import { insults, unimpressedWins } from '../data/result-insults.js';

const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const currentQuestionNumberDisplay = document.getElementById('current-question-number-display');
const questionDisplay = document.getElementById('question-display');
const valueDisplay = document.getElementById('value');
const categoryDisplay = document.getElementById('category');
const answerDisplay = document.getElementById('answer-display');
const scoreTotal = document.getElementById('score-total');
const timeLeft = document.getElementById('timeLeft');
const resultBox = document.getElementById('result-section');
const resultUserAnswer = document.getElementById('result-user-answer');
const resultCondition = document.getElementById('result-condition');
const resultExpectedAnswer = document.getElementById('result-expected-answer');

const urlRandom = 'https://cors-anywhere.herokuapp.com/http://jservice.io/api/random?count=100';

let currentQuestionNumber = 0;
currentQuestionNumberDisplay.textContent = currentQuestionNumber + 1;
let score = 0;
let failureNumber = 0;
loadHeader();
window.addEventListener('hashchange', () => { window.location.reload(); });
let n = 10;
const hash = window.location.hash.slice(1);
console.log(hash);
    
fetch(urlRandom, {
    headers: {
        origin: null
    }
})
    .then(response => response.json())
    .then(fetchedQuestions => {
        let randomQuestions = filterQuestions(fetchedQuestions);
        if(hash === 'easy') {
            randomQuestions = filterByEasy(randomQuestions);
        } else if(hash === 'medium') {
            randomQuestions = filterByMedium(randomQuestions);
        } else if(hash === 'hard') {
            randomQuestions = filterByHard(randomQuestions);
        }
        if(randomQuestions.length < 25) {
            window.location.reload();
        }
        let question = populateQuestion(randomQuestions, currentQuestionNumber);
        console.log(question.answer);
        
        const nReset = true;
        questionTimer(nReset);

        submitButton.addEventListener('click', () => {
            submitButton.disabled = true;
            resultBox.classList.remove('hidden');
            resultBox.classList.remove('correct');
            resultBox.classList.remove('incorrect');
            resultBox.classList.add('fade');
            
            const adjustedAnswer = adjustAnswer();
            const adjustedCorrectAnswer = adjustCorrectAnswer(question);
            evaluateAnswer(adjustedAnswer, adjustedCorrectAnswer, question, insults, unimpressedWins);
            userInput.value = '';
            
            setTimeout(() => {
                resultBox.classList.add('hidden');
                resultBox.classList.remove('fade');
            }, 6900);
            
            if(failureNumber >= 3 || currentQuestionNumber > 24) {
                auth.onAuthStateChanged(user => {
                    userRef.child(user.uid)
                        .update({
                            lastScore: score
                        });
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
                });
                
            }
            
            currentQuestionNumber++;
            setTimeout(() => {
                if(failureNumber < 3 && currentQuestionNumber < 25) {
                    question = populateQuestion(randomQuestions, currentQuestionNumber);
                    submitButton.disabled = false;
                    const nReset = true;
                    questionTimer(nReset);
                    console.log(question.answer);
                } else {
                    window.location = './scoreboard.html';
                }
            }, 7200);
            
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
    resultExpectedAnswer.textContent = question.answer;
    return adjustedCorrectAnswer;
}
function adjustAnswer() {
    let adjustedAnswer = userInput.value.toUpperCase();
    adjustedAnswer = removeCharacters(adjustedAnswer);
    resultUserAnswer.textContent = userInput.value;
    return adjustedAnswer;
}
    
function evaluateAnswer(adjustedAnswer, adjustedCorrectAnswer, question, insults, unimpressedWins){
    let random = Math.random();
        
    if(adjustedAnswer === ''){
        resultUserAnswer.textContent = 'NOTHING???';
        resultCondition.textContent = 'Wow. You didn\'t even try.';
        scoreTotal.textContent = score;
        failureNumber++;
        resultBox.classList.add('incorrect');
    }
    else if(adjustedAnswer.length < 0.8 * adjustedCorrectAnswer.length) {
        resultCondition.textContent = ' That\'s wrong.' + insults[Math.floor(random * insults.length)];
        scoreTotal.textContent = score;
        failureNumber++;
        resultBox.classList.add('incorrect');
    }
    else if(adjustedCorrectAnswer.includes(adjustedAnswer)){
        resultCondition.textContent = ' Correct.' + unimpressedWins[Math.floor(random * unimpressedWins.length)];
        score += question.score;
        scoreTotal.textContent = score;
        resultBox.classList.add('correct');
    }
    else {
        resultCondition.textContent = ' That\'s wrong.' + insults[Math.floor(random * insults.length)];
        scoreTotal.textContent = score;
        failureNumber++;
        resultBox.classList.add('incorrect');
    }
}
    
function questionTimer(nReset) {
    if(nReset) {
        n = 15;
    } else {
        n--;
    }

    if(n > 0) {
        setTimeout(questionTimer, 1000);
    } else if(n === 0) {
        submitButton.click();
        timeLeft.textContent = 0;
    }
    if(n > 0) timeLeft.textContent = n;
}