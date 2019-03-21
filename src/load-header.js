import { auth, userRef, scoresRef } from './firebase.js';
export function makeHeaderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <div id="center-header">
                <h1>Just Guess</h1>
                <div id="nav-container">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="trivia.html" class="nav-link">Play</a>
                    <a href="scoreboard.html" class="nav-link">High Scores</a>
                </div>
            </div>
        </header>
    `;
    return template.content;
}

export function makeProfile(user, userHighScore) {
    const template = document.createElement('template');
    const highScore = userHighScore || 0;
    template.innerHTML = /*html*/`
    <div id="profile-box">
    <img src="${user.photoURL || './assets/auth.jpeg'}" id="user-image">
    
    <div id=user-info>
    <span id="user-name">${user.displayName}</span>
    <div id="score-sign-out">
    <span id="high-score">High-Score:  ${highScore}</span>
    </div>
    <button id="sign-out">Sign Out</button>
    </div>
    </div>
    `;
    
    return template.content;
}

const headerContainer = document.getElementById('header-container'); 
export default function loadHeader(options){
    const dom = makeHeaderTemplate();
    headerContainer.appendChild(dom);
    // const window = window.location;
    if(options && options.skipAuth) {
        return;
    }
    auth.onAuthStateChanged(user => {
        if(!user) {
            window.location = './auth.html';
        }
        else {
            const targetScore = scoresRef.child(user.uid);
            targetScore.once('value').then(snapshot => {
                const value = snapshot.val();

                const userHighScore = value.highScore; 
            
                const userDom = makeProfile(user, userHighScore);
                const signOut = userDom.querySelector('button');
                signOut.addEventListener('click', () => {
                    auth.signOut();
                    window.location = './auth.html';
                });
                const header = headerContainer.querySelector('header');
                header.appendChild(userDom);
            });

        }
    });

    //check to see if there is a user signed in
    //if user, call makeProfile and append result to header container

}