import React, { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

// data
import formData from "../data/formData";

export default function DailyForm() {
  const [questionCount, setQuestionCount] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(formData[questionCount]);
  const [followUpUsed, setFollowUpUsed] = useState(false);

  const userSex = sessionStorage.sex;
  const userOccupation = sessionStorage.occupation;

  useEffect(() => {
    // on render remove all not needed questions
    formData.map((q, index) => {
      if (q.userType !== "All" && q.userType !== userOccupation) {
        formData.splice(index, 1);
      }
      if (q.sex !== "All" && q.sex !== userSex) {
        formData.splice(index, 1);
      }
    });
  }, []);

  useEffect(() => {
    setFollowUpUsed(false);
    setOpenQuestion(formData[questionCount]);
  }, [questionCount]);

  const handleNextQuestion = () => {
    if (openQuestion.followUpQuestion == undefined) {
      if (questionCount >= formData.length - 1) {
        setQuestionCount(0);
      } else {
        setQuestionCount(questionCount + 1);
      }
    } else if (followUpUsed) {
      if (questionCount >= formData.length - 1) {
        setFollowUpUsed(false);
        setQuestionCount(0);
      } else {
        setFollowUpUsed(false);
        setQuestionCount(questionCount + 1);
      }
    } else {
      // use followup
      setOpenQuestion(formData[questionCount].followUpQuestion);
      setFollowUpUsed(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionCount > 0) {
      setQuestionCount(questionCount - 1);
    } else {
      setQuestionCount(formData.length - 1);
    }
  };

  return (
    <>
      <Container sx={{ backgroundColor: "#ffffff" }}>
        <Grid container justifyContent="center" style={{ height: "100%" }}>
          <Grid item xs={12} style={{ height: "100%" }}>
            <Grid container style={{ height: "100%" }}>
              <Grid item xs={12} style={{ height: "100%" }}>
                <Card
                  sx={{
                    minWidth: "275px",
                    height: "350px",
                    width: "450px",
                    position: "relative",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center", // Center the content horizontally
                      height: "70%",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      {openQuestion !== undefined ? openQuestion.question : ""}
                    </Typography>
                    {openQuestion.inputType === "dateTime" ? (
                      <input
                        type="time"
                        style={{ marginTop: "30px", fontSize: "2rem" }}
                      ></input>
                    ) : openQuestion.inputType === "bool" ? (
                      <>
                        <Button
                          variant="text"
                          sx={{
                            position: "absolute",
                            bottom: "25%",
                            left: "32%",
                            fontSize: "2rem",
                          }}
                        >
                          No
                        </Button>
                        <Button
                          variant="text"
                          sx={{
                            position: "absolute",
                            bottom: "25%",
                            right: "32%",
                            fontSize: "2rem",
                          }}
                        >
                          Yes
                        </Button>
                      </>
                    ) : openQuestion.inputType === "text" ? (
                      <>
                        <TextField
                          type="text"
                          sx={{
                            position: "absolute",
                            bottom: "25%",
                            fontSize: "2rem",
                          }}
                        ></TextField>
                      </>
                    ) : (
                      ""
                    )}
                    <CardActions
                      sx={{
                        position: "absolute",
                        top: "75%",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => handlePreviousQuestion()}
                        sx={{ fontSize: "2rem" }}
                      >
                        <ArrowBack />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleNextQuestion()}
                        sx={{ fontSize: "2rem" }}
                      >
                        <ArrowForward />
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
