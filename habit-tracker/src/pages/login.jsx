import React, { useEffect } from "react";
import { useState } from "react";
import {Typography, Divider, Link, Grid, TextField, Button} from "@mui/material";

// db function calls

export default function login() {
  return <>
    <Grid container spacing={2}>
      <Grid xs={12}>
      WELCOME
      </Grid>
    </Grid>

    <Typography variant="h1" component="h2">WELCOME</Typography>
    <Typography variant="h2" component="h2">TO</Typography>
    <Typography variant="h1" component="h2">STRIVE</Typography>
    <Divider orientation="horizontal" flexItem /><br />
    <Typography variant="h5" component="h2">Have an account?</Typography><br />
    <TextField id="outlined-basic" label="EMAIL" variant="outlined" /><br /><br />
    <TextField id="outlined-basic" label="PASSWORD" variant="outlined" /><br /><br />
    <Button
      onClick={() => {
        alert('clicked'); //CHANGE IT TO NAVIGATE FURTHER!
      }}
    >
      Sign In
    </Button>
  </>;
}
