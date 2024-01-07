import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { db, auth } from '../firebase/FirebaseConfig'
import { collection, addDoc, getDoc } from 'firebase/firestore'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import formQuestions from '../data/formData';

// create user
export async function createUser(email, password, username, sex, occupation) {
    let result = false;
    await createUserWithEmailAndPassword(auth, email, password, username, sex, occupation)
        .then((userCredential) => {
            // Signed up 
            sessionStorage.setItem('currentUserUID', userCredential.user.uid);
            sessionStorage.setItem('sex', sex)
            sessionStorage.setItem('occupation', occupation)
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
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            navigate('/dailyForm');
            // ...
        } else {
            // User is signed out
            navigate('/login');
        }
    });
}
export async function get_User() {
    const user = auth.currentUser;
    return user;
}

export async function log_Out() {
    try {
        await signOut(auth)
        navigate('/login');
    } catch (error) {
        console.error('sign out failed');
    }
}

export async function get_User_Data(user, date) {
    const userDocRef = doc(db, 'users', user, date);
    try {
        data = await getDoc(userDocRef);
        return data;
    } catch (error) {
        console.log("broke");
    }

}

export async function writeCompletedForm(uid, userAnswers, dateCompleted) {
    let result = false;
    await addDoc(collection(db, 'completedForms'), { uid: uid, completedForm: userAnswers, dateCompleted: dateCompleted }).then(() => {
        console.log("completedFormWritten!!")
        result = true;
    }).catch((err) => {
        console.log(err);
    })
    return result;
}