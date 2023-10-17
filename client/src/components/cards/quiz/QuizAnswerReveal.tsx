import React from "react";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { QuizCardState } from "./QuizCard";
import PlaySoundButton from "../../shared/ui/PlaySoundButton";

interface QuizAnswerRevealProps {
  state: QuizCardState;
  correctLabel: string;
  wrongLabel: string;
  answer: string;
  answerAudioUrl?: string;
}

const QuizAnswerReveal: React.FC<QuizAnswerRevealProps> = ({
  state,
  correctLabel,
  wrongLabel,
  answer,
  answerAudioUrl,
}) => {
  if (state === "idle") {
    return null;
  }

  let variant: { severity: AlertColor; title: string } = {
    severity: "success",
    title: correctLabel,
  };

  if (state === "wrong") {
    variant = {
      severity: "error",
      title: wrongLabel,
    };
  } else if (state === "skipped") {
    variant = {
      severity: "info",
      title: "Question skipped",
    };
  }

  return (
    <Alert severity={variant.severity}>
      <AlertTitle>{variant.title}</AlertTitle>
      <div className="flex gap-0.5 items-center">
        <span>The correct definition is "{answer}"</span>
        <PlaySoundButton size="small" url={answerAudioUrl} />
      </div>
    </Alert>
  );
};

export default QuizAnswerReveal;
