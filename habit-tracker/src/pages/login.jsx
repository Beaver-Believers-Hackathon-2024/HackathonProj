import React, { useEffect } from "react";
import { useState } from "react";
import {Typography, Divider, Link, Grid, TextField, Button} from "@mui/material";
import { useNavigate } from "react-router";
import { get_User_Data, get_data } from "../firebase/DatabaseCalls";

// db function calls

export default function Login() {
  const navigate = useNavigate();
  document.body.style = "background: white";
  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography style={{color: "black"}} variant="h1" component="h2">
          WELCOME
        </Typography>
        <Typography style={{color: "black"}} variant="h2" component="h2">
          TO
        </Typography>
        <Typography style={{color: "black"}} variant="h1" component="h2">
          STRIVE
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
        <Grid item xs={6}><Divider orientation="horizontal" flexItem /></Grid>
        </Grid>
        
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: "black"}} variant="h5" component="h2">
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
            navigate("/dashboard");
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
