import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const navigate = useNavigate();

// test call to see if firebase is setup properly
export async function addTestUser() {
    console.log('test db')
    await addDoc(collection(db, 'users'), { userName: 'test2', uid: 'test2222' })
}
// create user
export async function createUser(auth, email, password){
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      const email = userCredential.email;
      const password = userCredential.password;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
export async function login(auth, email, password){
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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
      // ...
    }
  });
}