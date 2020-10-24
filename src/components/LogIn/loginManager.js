import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";



export const initializeLogInFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

const handleError = (error) => {
    const signedInUser = {
        isSignedIn: false,
        success: false,
        error: error.message,
        newUser: false
    }
    return signedInUser;
}
const setUserInfo = (res) => {
    const { displayName, email } = res.user;
    const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
        error: '',
        newUser: false
    }
    return signedInUser;
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => setUserInfo(result))
        .catch(error => handleError(error));
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then(result => setUserInfo(result))
        .catch(error => error);
}

export const createUserWithEmailAndPassword = (name,email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const { displayName,email } = res.user;
            const signedInUser = {
                isSignedIn: false,
                name: displayName,
                email: email,
                success: true,
                error: '',
                newUser: true
            }
            updateUserInfo(name);
            verifyEmail();
            return signedInUser;
        })
        .catch(err => handleError(err));
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => setUserInfo(res))
        .catch(error => handleError(error));
}

export const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
       sessionStorage.setItem('token', idToken);
      }).catch(function(error) {
       
      });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                success: false,
                error: '',
                newUser: false
            }
            return signedOutUser;
        })
        .catch(err => handleError(err));
}

const updateUserInfo = name => {
    let user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(() => {
        // Update successful.
    }).catch(error => {
        // An error happened.
    });
}
const verifyEmail = () => {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(() => {
        // Email sent.
    }).catch(error => {
        // An error happened.
    });
}
export const resetPassword = email => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
       
    }).catch(error => {
        
    });
}