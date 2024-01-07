import React from "react";
import { Grid, Container, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function dashboard(){
    const headerStyle = {display: "inline-flex", position: "fixed", top: 20, right: 30};
    const greetingsStyle = {position: "fixed"}
    const navigate = useNavigate();
    return <>
        <div className="header" style={headerStyle}>
            <Button
            onClick={()=>{
                navigate("/dailyForm")
            }}
            variant="contained">
                Today's Survey
            </Button>
            {/* if data .get's date is today, then Review Survey else Today's survey */}

            <Avatar sx={{marginLeft: 10, bgcolor: "red"}}>U</Avatar>
        </div>

        <div className="greetings" style={{top: "10%", position: "fixed", alignContent: "center", left: "40%"}}>
            <Typography 
            variant="h2">Hello, User.</Typography>
            <Typography 
            variant="body1">Let's see some of your recent data.</Typography>
        </div>
    
    </>;
}