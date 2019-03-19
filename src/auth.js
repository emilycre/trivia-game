import { auth, userRef } from './firebase.js';
import loadHeader from './load-header.js';

const options = {
    skipAuth: true
};

loadHeader(options);

const ui = new firebaseui.auth.AuthUI(auth);

ui.start('#auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],    
    signInSuccessUrl: './index.html',
    callbacks: {
        signInSuccessWithAuthResult(authResults) {
            const user = authResults.user;

            userRef.child(user.uid)     
                .set({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });

            return true;
        }
    }
});

