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
  Paper,
} from "@mui/material";

import { login } from "../firebase/DatabaseCalls";
import { auth } from "../firebase/FirebaseConfig";
import { green } from "@mui/material/colors";

// db function calls

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const headerStyle = {
    display: "inline-flex",
    position: "fixed",
    top: 0,
    right: 30,
  };

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
      <div className="header" style={headerStyle}>
        <Button
          style={{ fontWeight: "bold", fontFamily: "Arial" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Accessibility ON
        </Button>
      </div>

      <Paper
        style={{
          border: "2px solid lightBlue",
          width: "fit-content",
          alignContent: "center",
          paddingTop: "8%",
          paddingBottom: "8%",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Typography
              style={{ fontFamily: "Arial", fontWeight: "bold" }}
              variant="h3"
              component="h1"
              color="primary"
            >
              WELCOME
            </Typography>
            <Typography variant="h4" component="h1" color="primary">
              TO
            </Typography>
            <Typography variant="h3" component="h1" color="primary">
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
              style={{
                fontFamily: "Calibri",
                fontWeight: "bold",
                fontSize: "150%",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
