import { auth, scoresRef } from './firebase.js';
import loadHeader from './load-header.js';
import loadHighScores from './scoreboard-components.js';

loadHeader();

scoresRef.once('value')
    .then(snapshot => {
        const value = snapshot.val();
        const scoreArray = Object.values(value);
        scoreArray.sort(function(a, b) {
            return b.highScore - a.highScore;
        });
        loadHighScores(scoreArray);
    });

