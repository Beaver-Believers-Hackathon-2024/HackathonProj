import React, { useEffect } from "react";
import { useState } from "react";
import {createUser} from '../firebase/DatabaseCalls'
import { auth } from '../firebase/FirebaseConfig'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// db function calls

export default function login() {

  <button onClick={createUser}> Create Account</button>
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}
