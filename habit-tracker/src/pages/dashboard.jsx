import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMostRecentCompletedForm } from "../firebase/DatabaseCalls";
import FadeIn from "react-fade-in";

export default function dashboard() {
  const [formData, setFormData] = useState(null);
  const [username, setUsername] = useState(sessionStorage.username);

  const headerStyle = {
    display: "inline-flex",
    position: "fixed",
    top: 20,
    right: 30,
  };
  const greetingsStyle = {
    color: "black",
    width: "100%",
    alignContent: "center",
  };
  const oldStyle = {
    top: "10%",
    position: "fixed",
    alignContent: "center",
    left: "40%",
  };
  const navigate = useNavigate();

  useEffect(() => {
    getMostRecentCompletedForm(sessionStorage.currentUserUID).then((result) => {
      console.log("run");
      if (result !== undefined) {
        console.log("result ", result);
        setFormData(result);
        setUsername(sessionStorage.username);
      }
    });
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Container>
        <div className="header" style={headerStyle}>
          <Button
            onClick={() => {
              navigate("/dailyForm");
            }}
            variant="contained"
          >
            Today's Survey
          </Button>
          {/* if data .get's date is today, then Review Survey else Today's survey */}

          <Avatar sx={{ marginLeft: 5, bgcolor: "red" }}>U</Avatar>
        </div>

        <div className="greetings" style={greetingsStyle}>
          <Typography variant="h2">
            Hello, {username !== undefined ? username : "User"}.
          </Typography>
          <Typography variant="body1">Let's review your day.</Typography>
        </div>
        <Grid
          container
          spacing={4}
          pt={6}
          sx={{ margin: "0 auto", width: "45%" }}
        >
          {formData !== null ? (
            formData.completedForm.map((q, index) => (
              <Grid item xs={12} key={index}>
                {index % 2 ? (
                  <>
                    <FadeIn delay={1000}>
                      <Typography variant="body1" color="#1f1f1f" align="right">
                        {q.question}
                      </Typography>
                      <Typography variant="body1" color="#848484" align="right">
                        {q.answer}
                      </Typography>
                    </FadeIn>
                  </>
                ) : (
                  <>
                    <FadeIn delay={1000}>
                      <Typography variant="body1" align="left" color="#1f1f1f">
                        {q.question}
                      </Typography>
                      <Typography variant="body1" color="#848484" align="left">
                        {q.answer.toString()}
                      </Typography>
                    </FadeIn>
                  </>
                )}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="primary">
                No Form To Display
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
