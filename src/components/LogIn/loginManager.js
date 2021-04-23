/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

export const initializeLogInFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
};

const handleError = (error) => {
    const signedInUser = {
        isSignedIn: false,
        success: false,
        error: error.message,
        newUser: false,
    };
    return signedInUser;
};
const setUserInfo = (res) => {
    const { displayName, email } = res.user;
    const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email,
        success: true,
        error: '',
        newUser: false,
    };
    return signedInUser;
};
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => setUserInfo(result))
        .catch((error) => handleError(error));
};

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => setUserInfo(result))
        .catch((error) => error);
};

export const createUserWithEmailAndPassword = (userName, userEmail, userPassword) =>
    firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((res) => {
            const { displayName, email } = res.user;
            const signedInUser = {
                isSignedIn: false,
                name: displayName,
                email,
                success: true,
                error: '',
                newUser: true,
            };
            updateUserName(userName);
            verifyEmail();
            return signedInUser;
        })
        .catch((err) => handleError(err));
export const signInWithEmailAndPassword = (email, password) =>
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => setUserInfo(res))
        .catch((error) => handleError(error));

export const handleSignOut = () =>
    firebase
        .auth()
        .signOut()
        .then((res) => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                success: false,
                error: '',
                newUser: false,
            };
            return signedOutUser;
        })
        .catch((err) => handleError(err));

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        name,
    })
        .then(() => {})
        .catch((error) => {
            // An error happened.
        });
};
const verifyEmail = () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification()
        .then(() => {
            // Email sent.
        })
        .catch((error) => {
            // An error happened.
        });
};
export const resetPassword = (email) => {
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {})
        .catch((error) => {});
};

export const storeAuthToken = () => {
    firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
            sessionStorage.setItem('token', idToken);
        })
        .catch((error) => {});
};
