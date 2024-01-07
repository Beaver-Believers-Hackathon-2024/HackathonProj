import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { writeCompletedForm } from "../firebase/DatabaseCalls";

// data
import formData from "../data/formData";

export default function DailyForm() {
  const [questionCount, setQuestionCount] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(formData[questionCount]);
  const [followUpUsed, setFollowUpUsed] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [booleanInput, setBooleanInput] = useState('');
  const [textInput, setTextInput] = useState("");
  const [firstQuestionAnswered, setFirstQuestionAnswered] = useState(false);

  const [userAnswers, setUserAnswers] = useState([]);

  const userSex = sessionStorage.sex;
  const userOccupation = sessionStorage.occupation;

  const navigate = useNavigate()


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
    // ADD USER ANSWERS TO ARRAY!
    if (firstQuestionAnswered) {
      setUserAnswers([...userAnswers,{answer: openQuestion.inputType=="bool" ? booleanInput : openQuestion.inputType=="text" ? textInput: dateInput, question:openQuestion.question}])
    }
    setOpenQuestion(formData[questionCount]);
    setFirstQuestionAnswered(true)
  }, [questionCount]);

  useEffect(() => {
    console.log(userAnswers)
  }, [userAnswers]);

  const handleNextQuestion = () => {
    if (openQuestion.followUpQuestion == undefined) {
      if (questionCount >= formData.length - 1) {
        //FORM OVER, HEAD TO DASHBOARD!
        writeCompletedForm(sessionStorage.currentUserUID, userAnswers, new Date()).then((result) => {
          if (result) {
            navigate('/dashboard')
          }
        })
      } else {
        setQuestionCount(questionCount + 1);
      }
    } else if (followUpUsed) {
      if (questionCount >= formData.length - 1) {
        setFollowUpUsed(false);
        //FORM OVER, HEAD TO DASHBOARD!
        writeCompletedForm(sessionStorage.currentUserUID, userAnswers, new Date()).then((result) => {
          if (result) {
            navigate('/dashboard')
          }
        })
      } else {
        setFollowUpUsed(false);
        setQuestionCount(questionCount + 1);
        setFirstQuestionAnswered(true)
      }
    } else {
      // use followup
      if(booleanInput){
        setOpenQuestion(formData[questionCount].followUpQuestion);
        setUserAnswers([...userAnswers,{answer: openQuestion.inputType=="bool" ? booleanInput: openQuestion.inputType=="text" ? textInput: dateInput, question:openQuestion.question}])
        setFollowUpUsed(true);
      }else{
        setOpenQuestion(formData[questionCount+1]);
        setUserAnswers([...userAnswers,{answer: openQuestion.inputType=="bool" ? booleanInput: openQuestion.inputType=="text" ? textInput: dateInput, question:openQuestion.question}])
        setFollowUpUsed(true);
      }


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
                        onChange={(e) => setDateInput(e.target.value)}
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
                          onClick={() => setBooleanInput(false)}

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
                          onClick={() => setBooleanInput(true)}

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
                          onChange={(e) => setTextInput(e.target.value)}
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
