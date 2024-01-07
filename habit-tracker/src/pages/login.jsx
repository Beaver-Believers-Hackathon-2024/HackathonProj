import React, { useEffect } from "react";
import { useState } from "react";
import {Typography, Divider, Link, Grid, TextField, Button} from "@mui/material";

import { useNavigate } from "react-router";

// db function calls

export default function Login() {
  const navigate = useNavigate();
  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" component="h2">
          WELCOME
        </Typography>
        <Typography variant="h2" component="h2">
          TO
        </Typography>
        <Typography variant="h1" component="h2">
          STRIVE
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
        <Grid item xs={6}><Divider orientation="horizontal" flexItem /></Grid>
        </Grid>
        
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          Have an account?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="EMAIL" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="PASSWORD" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained"
          onClick={() => {
            alert('clicked'); // CHANGE IT TO NAVIGATE FURTHER!
          }}
        >
          Sign In
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            alert('clicked'); // CHANGE IT TO NAVIGATE FURTHER!
          }}
        >
          Don't have an account? Sign Up
        </Button>
      </Grid>
    </Grid>
  </>
}
