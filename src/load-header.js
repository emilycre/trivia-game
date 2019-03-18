import { auth } from "./firebase.js";

export function makeHeaderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
        <header>
            <img src="assets/party-blob.gif" alt="party blob" id="party-blob">
            <h1>Trivia Game</h1>
        </header>
    `;
    return template.content;
}

export function makeProfile(user) {
    const template = document.createElement('template');
    template.innerHTML = `
    <div>
    <img src="${user.photoURL || './assets/auth.jpeg'}" id="user-image">
    <span id="user-name">${user.displayName}</span>
    <button id="sign-out">Sign Out</button>
    </div>
    `;
    
    return template.content;
}

const headerContainer = document.getElementById('header-container'); 
export default function loadHeader(){
    const dom = makeHeaderTemplate();
    headerContainer.appendChild(dom);
    auth.onAuthStateChanged(user => {
        if(!user) {
            window.location = './auth.html';
        }
        else {
            const userDom = makeProfile(user);
            const signOut = userDom.querySelector('button');
            signOut.addEventListener('click', () => {
                auth.signOut();
                window.location = './auth.html';
            });

            const header = headerContainer.querySelector('header');
            header.appendChild(userDom);
        }
    });

    //check to see if there is a user signed in
    //if user, call makeProfile and append result to header container

}