import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { db, auth } from '../firebase/FirebaseConfig'
import { collection, addDoc, getDoc, getDocs, doc, query, orderBy, limit, where } from 'firebase/firestore'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import formQuestions from '../data/formData';

// create user
export async function createUser(email, password, username, sex, occupation) {
    let result = false;
    await createUserWithEmailAndPassword(auth, email, password, username, sex, occupation)
        .then((userCredential) => {
            // Signed up 
            sessionStorage.setItem('currentUserUID', userCredential.user.uid);
            sessionStorage.setItem('sex', sex);
            sessionStorage.setItem('occupation', occupation);
            sessionStorage.setItem('username', username);
            writeNewUserData(userCredential.user.email, username, userCredential.user.uid, sex, occupation);
            result = true;
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
        .then(async (userCredential) => {
            sessionStorage.setItem('currentUserUID', userCredential.user.uid);
            await getUsersData(userCredential.user.uid)
            result = true;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    return (result);
}

export async function getMostRecentCompletedForm(uid) {
    const querySnapshot = await getDocs(
        query(
            collection(db, 'completedForms'),
            orderBy('dateCompleted', 'desc'),
            where('uid', '==', uid),
            limit(1)
        )
    )
    let completedForm;
    querySnapshot.forEach((doc) => {
        console.log('data: ', doc.data())
        completedForm = doc.data()
    })
    return completedForm;
}

export async function getUsersData(uid) {
    let userSnapShot = await getDoc(doc(db, 'users', uid));
    if (userSnapShot.exists()) {
        sessionStorage.setItem('username', userSnapShot.data().userName)
    }
}

export async function logged_in(auth, user) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            get_User_Data()
        } else {
            // User is signed out
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