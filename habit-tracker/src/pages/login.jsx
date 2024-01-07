import React, { useEffect } from "react";
import { useState } from "react";
import {createUser} from '../firebase/DatabaseCalls'
import { auth } from '../firebase/FirebaseConfig'

// db function calls

export default function login() {
  useEffect(()=>{
    createUser(auth, "test2@gmail.com", "password");
  }, [])
  return <>hello</>;
}
