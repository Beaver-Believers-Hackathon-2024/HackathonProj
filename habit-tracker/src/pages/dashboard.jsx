import React from "react";
import { Grid, Container, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get_User, get_Username } from "../firebase/DatabaseCalls";
import { getUnit } from "@mui/material/styles/cssUtils";

function stringToColor(string) {
    let hash = 0;
    let i;
      for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }  
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        marginLeft: 5,
      },
      children: `${name[0]}`,
    };
  }

export default function dashboard(){
    const headerStyle = {display: "inline-flex", position: "fixed", top: 20, right: 30};
    const greetingsStyle = {color: "black", width: "100%", alignContent: "center"}
    const oldStyle = {top: "10%", position: "fixed", alignContent: "center", left: "40%"};
    const navigate = useNavigate();
    const user = get_User();
    const username = get_Username(user);
    console.log(username.toString());
    return <>
        <div className="header" style={headerStyle}>
            <Button
            onClick={()=>{
                navigate("/dailyForm")
            }}
            variant="contained">
                Today's Survey
            </Button>
            {/* <Avatar{...stringAvatar(username.toString())}></Avatar> */}
            <Avatar sx={{marginLeft: 5, bgcolor: "blue"}}></Avatar>
        </div>

        <div className="greetings" style={greetingsStyle}>
            <Typography variant="h2">Hello, User.</Typography>
            <Typography variant="body1">Let's see some of your recent data.</Typography>
        </div>

        <Container component="main" maxWidth="xs">Hello</Container>
    
    </>;
}