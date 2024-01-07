import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  FormLabel,
  Divider,
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
        occupationInput
      ).then((result) => {
        if (result === true) {
          navigate("/dashboard");
        }
      });
    } else {
      console.log("Invalid input fields");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=612x612&w=0&k=20&c=UHeb1pGOw6ozr6utsenXHhV19vW6oiPIxDqhKCS2Llk=)',
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ width: "80%" }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: 3,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h2" color="primary" sx={{ mb: 2 }}>
            STRIVE
          </Typography>

          <Divider
            orientation="horizontal"
            flexItem
            sx={{ width: "100%", mt: 2, mb: 2 }}
          />

          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            SIGN UP
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
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
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
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Grid container sx={{ textAlign: "center" }}>
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
    </Box>
  );
}