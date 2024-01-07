import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase/FirebaseConfig'
import { collection, addDoc, getDoc } from 'firebase/firestore'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import formQuestions from '../data/formData';

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
      navigate('/login');
    }
  });
}
export async function get_User(){
  const user = auth.currentUser;
  return user;
}

export async function log_Out(){
  try {
    await signOut(auth)
    navigate('/login');
  } catch (error){
    console.error('sign out failed');
  }
}

export async function get_User_Data(user, date){
  const userDocRef = doc(db, 'users', user, date);
  try {
    data = await getDoc(userDocRef);
    return data;
  } catch (error){
    console.log("broke");
  }

}

