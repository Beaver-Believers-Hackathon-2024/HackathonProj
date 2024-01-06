import { db } from '../firebase/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

// test call to see if firebase is setup properly
export async function addTestUser() {
    console.log('test db')
    await addDoc(collection(db, 'users'), { userName: 'test2', uid: 'test2222' })
}