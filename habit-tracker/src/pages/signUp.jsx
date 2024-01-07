import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { createUser } from "../firebase/DatabaseCalls";

export default function SignUp() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [sexInput, setSexInput] = useState("female");
  const [occupationInput, setOccupationInput] = useState("student");

  const navigate = useNavigate();

  const handleCreateNewAccount = (e) => {
    console.log(emailInput, passwordInput);
    e.preventDefault();
    if (
      emailInput !== undefined &&
      emailInput.trim() !== "" &&
      usernameInput !== undefined &&
      usernameInput.trim() !== "" &&
      passwordInput !== undefined &&
      passwordInput.trim() !== ""
    ) {
      createUser(
        emailInput,
        passwordInput,
        usernameInput,
        sexInput,
        occupationInput,
      ).then((result) => {
        if (result == true) {
          navigate("/dashboard");
        }
      });
    } else {
      console.log("Invalid input fields");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleCreateNewAccount(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Enter Username"
            type="text"
            id="username"
            autoComplete="current-password"
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e, val) => setSexInput(val)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Occupation
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="student"
              name="radio-buttons-group"
              onChange={(e, val) => setOccupationInput(val)}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="workForce"
                control={<Radio />}
                label="Work Force"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Enter Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>

          <Grid container sx={{ textAlgin: "center" }}>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
