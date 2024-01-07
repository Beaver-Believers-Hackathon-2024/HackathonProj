import React from "react";
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

//data
import formData from "../data/formData";

export default function dailyForm() {
  const [questionCount, setQuestionCount] = useState(1);

  const handleNextQuestion = () => {
    if (questionCount < formData.length - 1) {
      setQuestionCount(questionCount + 1);
    } else {
      setQuestionCount(1);
    }
  };

  return (
    <>
      <Container sx={{ backgroundColor: "#ffffff" }}>
        <Grid container justifyContent="center">
          <Grid item xs={7}>
            <Grid container>
              <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography>
                      {formData[questionCount].question !== undefined
                        ? formData[questionCount].question
                        : ""}
                    </Typography>
                    {formData[questionCount].inputType === "dateTime" ? (
                      <input type="time"></input>
                    ) : formData[questionCount].inputType === "bool" ? (
                      <>
                        <Button variant="text">No</Button>
                        <Button variant="text">Yes</Button>
                      </>
                    ) : formData[questionCount].inputType === "text" ? (
                      <>
                        <TextField type="text"></TextField>
                      </>
                    ) : (
                      ""
                    )}
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleNextQuestion()}>
                      Next Question
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
