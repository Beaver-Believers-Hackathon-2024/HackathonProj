import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { Routes, Route, } from "react-router-dom";

// test call to see if firebase is setup properly

// create user
export async function createUser(email, password, username, sex, occupation) {
    let result = false;
    await createUserWithEmailAndPassword(auth, email, password, username, sex, occupation)
        .then((userCredential) => {
            // Signed up 
            sessionStorage.setItem('currentUserUID', userCredential.user.uid);
            writeNewUserData(userCredential.user.email, username, userCredential.user.uid, sex, occupation)
            result = true
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    return (result)
}

export async function writeNewUserData(email, username, uid, sex, occupation) {
    await addDoc(collection(db, 'users'), { email: email, userName: username, uid: uid, sex: sex, occupation: occupation }).then(() => {
        console.log('user added')
    }).catch((err) => {
        console.log(err);
    })
}

export async function login(email, password) {
    let result = false;
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sessionStorage.setItem('currentUserUID', userCredential.user.uid);
            result = true;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    return (result)
}
export async function logged_in(auth, user) {
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            navigate('/dailyForm');


            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}