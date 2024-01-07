import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Divider,
  Box,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

// data
import formData from "../data/formData";

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
      </Container>
    </Box>
  );
};

export default DailyForm;