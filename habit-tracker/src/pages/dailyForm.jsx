<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> fd423359af6a248dfe1b4c29c85b3338ef1cd5a2
import {
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
<<<<<<< HEAD
  Divider,
  Box,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
=======
  Slider,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { writeCompletedForm } from "../firebase/DatabaseCalls";
>>>>>>> fd423359af6a248dfe1b4c29c85b3338ef1cd5a2

// data
import formData from "../data/formData";

<<<<<<< HEAD
const DailyForm = () => {
  const [questionCount, setQuestionCount] = useState(1);

  const handleNextQuestion = () => {
    setQuestionCount((prevCount) =>
      prevCount < formData.length - 1 ? prevCount + 1 : 1
    );
  };

  const handlePreviousQuestion = () => {
    setQuestionCount((prevCount) =>
      prevCount > 1 ? prevCount - 1 : formData.length - 1
    );
  };

  const renderInputType = () => {
    const currentQuestion = formData[questionCount];

    if (currentQuestion.inputType === "dateTime") {
      return (
        <input
          type="time"
          style={{ marginTop: "30px", fontSize: "2rem" }}
        />
      );
    } else if (currentQuestion.inputType === "bool") {
      return (
        <>
          <Button
            variant="text"
            sx={{
              position: "absolute",
              bottom: "15%",
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
              bottom: "15%",
              right: "32%",
              fontSize: "2rem",
            }}
          >
            Yes
          </Button>
        </>
      );
    } else if (currentQuestion.inputType === "text") {
      return (
        <TextField
          type="text"
          sx={{
            position: "absolute",
            bottom: "40%",
            fontSize: "2rem",
          }}
        />
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=612x612&w=0&k=20&c=UHeb1pGOw6ozr6utsenXHhV19vW6oiPIxDqhKCS2Llk=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "600px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ width: "100%", padding: '15px' }}>
        <Card
          sx={{
            height: "90vh",
            width: "400px",
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center' }}>
              <Typography variant="h2" color="primary" sx={{ mt: 4, mb: 2, fontSize: '3rem' }}>
                STRIVE
              </Typography>
              <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 2 }} />
            </Box>
            <Typography sx={{ fontSize: '2rem', marginTop: '20px' }}>
              {formData[questionCount]?.question || ""}
            </Typography>
            {renderInputType()}
            <CardActions
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px',
              }}
            >
              <Button size="small" onClick={handlePreviousQuestion} sx={{ fontSize: '2rem' }}>
                <ArrowBack />
              </Button>
              <Button size="small" onClick={handleNextQuestion} sx={{ fontSize: '2rem' }}>
                <ArrowForward />
              </Button>
            </CardActions>
          </CardContent>
        </Card>
=======
export default function DailyForm() {
  const [questionCount, setQuestionCount] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(formData[questionCount]);
  const [followUpUsed, setFollowUpUsed] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [booleanInput, setBooleanInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const [userAnswers, setUserAnswers] = useState([]);

  const userSex = sessionStorage.sex;
  const userOccupation = sessionStorage.occupation;

  const navigate = useNavigate();

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
    if (questionCount > 0) {
      setFollowUpUsed(false);
      setOpenQuestion(formData[questionCount]);
    }
    if (openQuestion.inputType === "slider") {
      setTextInput("5"); // Set the initial value for the slider (e.g., 5)
    }
  }, [questionCount]);

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  const handleNextQuestion = () => {
    setUserAnswers([
      ...userAnswers,
      {
        answer:
          openQuestion.inputType == "bool"
            ? booleanInput
            : openQuestion.inputType == "text"
              ? textInput
              : openQuestion.inputType == "slider"
                ? textInput
                : dateInput,
        question: openQuestion.question,
      },
    ]);
  };

  useEffect(() => {
    if (userAnswers.length > 0) {
      if (openQuestion.followUpQuestion == undefined) {
        console.log(1);
        if (questionCount >= formData.length - 1) {
          //FORM OVER, HEAD TO DASHBOARD!
          console.log("answers", userAnswers);
          writeCompletedForm(
            sessionStorage.currentUserUID,
            userAnswers,
            new Date(),
          ).then((result) => {
            if (result) {
              navigate("/dashboard");
            }
          });
        } else {
          setQuestionCount(questionCount + 1);
        }
      } else if (followUpUsed) {
        if (questionCount >= formData.length - 1) {
          setFollowUpUsed(false);
          //FORM OVER, HEAD TO DASHBOARD!
          writeCompletedForm(
            sessionStorage.currentUserUID,
            userAnswers,
            new Date(),
          ).then((result) => {
            if (result) {
              navigate("/dashboard");
            }
          });
        } else {
          setQuestionCount(questionCount + 1);
          setFollowUpUsed(false);
        }
      } else {
        // use followup
        if (booleanInput) {
          setOpenQuestion(formData[questionCount].followUpQuestion);
          setFollowUpUsed(true);
        } else {
          if (questionCount >= formData.length - 1) {
            //FORM OVER, HEAD TO DASHBOARD!
            writeCompletedForm(
              sessionStorage.currentUserUID,
              userAnswers,
              new Date(),
            ).then((result) => {
              if (result) {
                navigate("/dashboard");
              }
            });
          } else {
            setQuestionCount(questionCount + 1);
            setFollowUpUsed(true);
          }
        }
      }
    }
  }, [userAnswers]);

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
                    ) : openQuestion.inputType === "slider" ? (
                      <>
                        <Slider
                          value={parseInt(textInput, 10) || 0}
                          onChange={(e, value) =>
                            setTextInput(value.toString())
                          }
                          min={1}
                          max={10}
                          step={1}
                          style={{ width: "80%", marginTop: "30px" }}
                        />
                        <Typography
                          sx={{ fontSize: "2rem", marginTop: "10px" }}
                        >
                          {textInput}
                        </Typography>
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
                        onClick={() => handleNextQuestion()}
                        sx={{ fontSize: "2rem", margin: "0 auto" }}
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
>>>>>>> fd423359af6a248dfe1b4c29c85b3338ef1cd5a2
      </Container>
    </Box>
  );
};

export default DailyForm;