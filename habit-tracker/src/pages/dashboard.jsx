import React from "react";
import { Grid, Container, Typography } from "@mui/material";

{
  item ? (
    <img
      style={{
        width: 210,
        height: 118,
      }}
      alt={item.title}
      src={item.src}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}

export default function dashboard(){
    return <>
        <Grid container spacing={2}>
            <Grid xs={12}>
                WELCOME
            </Grid>
        </Grid>

    <Typography variant="h1" component="h2">WELCOME</Typography>
    
    </>;
}