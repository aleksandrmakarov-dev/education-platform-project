import { Button } from "@mui/material";
import React from "react";
import { QuizCardState } from "./QuizCard";

interface QuizActionsProps {
  state: QuizCardState;
  isLastQuestion: boolean;
  onSkipClick: () => void;
  onNextClick: () => void;
  onTryAgainClick: () => void;
}

const QuizActions: React.FC<QuizActionsProps> = ({
  state,
  isLastQuestion,
  onNextClick,
  onSkipClick,
  onTryAgainClick,
}) => {
  return (
    <>
      {state === "idle" && (
        <>
          <Button type="button" onClick={onSkipClick}>
            Don't Know?
          </Button>
          <Button variant="contained" type="submit" disableElevation>
            Check Answer
          </Button>
        </>
      )}
      {state !== "idle" && state !== "finished" && (
        <Button
          variant="contained"
          disableElevation
          onClick={onNextClick}
          type="button"
        >
          {isLastQuestion ? "Finish" : "Next Question"}
        </Button>
      )}
      {state === "finished" && (
        <Button
          variant="contained"
          disableElevation
          onClick={onTryAgainClick}
          type="button"
        >
          Try again
        </Button>
      )}
    </>
  );
};

export default QuizActions;
