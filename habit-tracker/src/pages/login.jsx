import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { login } from "../firebase/DatabaseCalls";

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login(emailInput, passwordInput).then((result) => {
      if (result === true) {
        navigate("/dashboard");
      } else {
        console.log("input errors");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundImage:
          'url(https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=612x612&w=0&k=20&c=UHeb1pGOw6ozr6utsenXHhV19vW6oiPIxDqhKCS2Llk=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: '15px',
      }}
    >
      <Box
        sx={{
          height: "90vh",
          backgroundColor: "#ffffff",
          padding: 3,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "70%",
          maxWidth: "375px", // Set a maximum width for the white box
          margin: "auto", // Center the white box horizontally
          alignItems: "center",
justifyContent: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">
              STRIVE
              <Divider orientation="horizontal" flexItem sx={{ mx: 1 }} />
              WELCOME
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="EMAIL"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="PASSWORD"
              variant="outlined"
              fullWidth
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={(e) => handleLogin(e)}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}