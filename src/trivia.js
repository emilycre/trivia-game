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
            console.log(adjustedCorrectAnswer, adjustedAnswer);
            if(adjustedAnswer === ''){
                //display fail message
                resultCondition.textContent = 'INCORRECT';
                console.log('fail1');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            else if(adjustedAnswer.length < 0.9 * adjustedCorrectAnswer.length) {
                resultCondition.textContent = 'INCORRECT';
                console.log('fail2');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            else if(adjustedCorrectAnswer.includes(adjustedAnswer)){
                console.log('NICE');
                resultCondition.textContent = 'CORRECT';
                score += question.score;
                scoreTotal.textContent = score;
            }
            else {
                //display fail message
                resultCondition.textContent = 'INCORRECT';
                console.log('fail3');
                score -= question.score;
                scoreTotal.textContent = score;
            }
            userInput.value = '';

            if(currentQuestionNumber >= 2) {
                auth.onAuthStateChanged(user => {

                    const targetScores = scoresRef.child(user.uid);
                    targetScores.once('value').then(snapshot => {
                        const value = snapshot.val();

                        if(!value){
                            scoresRef.child(user.uid)
                                .set({
                                    highScore: score
                                });
                            
                        }
                        else if(score > value.highScore) {
                            scoresRef.child(user.uid)
                                .set({
                                    highScore: score
                                });  
                        


                        // if(!value.highScore){
                        //     userRef.child(user.uid)
                        //         .set({
                        //             highScore: score
                        //         });
                        // }



                            // scoresRef.child(user.uid)
                            //     .update({
                            //         name: user.displayName,
                            //         highScore: user.highScore
                            //     });
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