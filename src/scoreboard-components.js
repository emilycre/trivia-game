import { userRef, auth } from './firebase.js';

const userScore = document.getElementById('user-score');
const userScoreDisplay = document.getElementById('user-score-display');

export function makeHighScoreRow(scoreEntry, entryRank) {
    const html = /*html*/ `
    <tr>
        <td>${entryRank}.</td>
        <td>${scoreEntry.name}</td>
        <td>${scoreEntry.highScore}</td>
    </tr>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
} 

export default function loadHighScores(scoreArray) {
    let listLength = scoreArray.length;
    if(scoreArray.length > 9) {
        listLength = 10;
    }

    auth.onAuthStateChanged(user=> {
        const currentUser = userRef.child(user.uid);
        currentUser.once('value').then(snapshot => {
            const value = snapshot.val();        

            if(value.lastScore){
                userScore.textContent = value.lastScore;
            }
            else {
                userScoreDisplay.hidden = true;
            }
        });

        for(let i = 0; i < listLength; i++) {
            const entryRank = i + 1;
            const dom = makeHighScoreRow(scoreArray[i], entryRank);
            const tr = dom.querySelector('tr');
            const tableBody = document.getElementById('score-table-body');
            if(scoreArray[i].name === user.displayName){
                tr.classList.add('user-score-targeted');
            }
            tableBody.appendChild(dom);
        }
    });
}