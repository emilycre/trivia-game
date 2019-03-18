
const config = {
    apiKey: 'AIzaSyCaq0Tb-QL42mS3dTLWEpoZutzTQnOGitg',
    authDomain: 'trivia-game-af552.firebaseapp.com',
    databaseURL: 'https://trivia-game-af552.firebaseio.com',
    projectId: 'trivia-game-af552'
};

export const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
export const userRef = db.ref('users');
export const scoresRef = db.ref('scores');