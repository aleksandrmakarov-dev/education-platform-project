import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { QuizCardState } from "./QuizCard";

interface QuizAnswerRevealProps {
  state: QuizCardState;
  correctLabel: string;
  wrongLabel: string;
  answer: string;
}

const QuizAnswerReveal: React.FC<QuizAnswerRevealProps> = ({
  state,
  correctLabel,
  wrongLabel,
  answer,
}) => {
  if (state === "idle") {
    return null;
  }

  if (state === "correct") {
    return <Alert severity="success">{correctLabel}</Alert>;
  }

  if (state === "wrong") {
    return (
      <Alert severity="error">
        <AlertTitle>{wrongLabel}</AlertTitle>
        <p>The correct definition is "{answer}"</p>
      </Alert>
    );
  }

  if (state === "skipped") {
    return (
      <Alert severity="info">
        <AlertTitle>Question skipped</AlertTitle>
        <p>The correct definition is "{answer}"</p>
      </Alert>
    );
  }
};

export default QuizAnswerReveal;
