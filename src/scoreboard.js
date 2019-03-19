import { auth, db, scoresRef, userRef} from './firebase.js';
import loadHeader from './load-header.js';

loadHeader();

auth.onAuthStateChanged(user => {
    const currentUserId = user.uid;
    console.log(currentUserId);

    scoresRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            console.log(Object.values(value));
            const scoreArray = Object.values(value);
            scoreArray.sort(function(a, b) {
                return b.highScore - a.highScore;
            });
            console.log('score array', scoreArray);
        });
});
