import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Divider,
  Link,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { login } from "../firebase/DatabaseCalls";
import { auth } from "../firebase/FirebaseConfig";

// db function calls

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(emailInput, passwordInput).then((result) => {
      if (result == true) {
        navigate("/dashboard");
      } else {
        console.log("input errors");
      }
    });
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h4" component="h2" color="primary">
            WELCOME
          </Typography>
          <Typography variant="h5" component="h2" color="primary">
            TO
          </Typography>
          <Typography variant="h4" component="h2" color="primary">
            STRIVE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={2}>
              <Divider orientation="horizontal" flexItem />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="EMAIL"
            variant="outlined"
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="PASSWORD"
            variant="outlined"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={(e) => handleLogin(e)}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
