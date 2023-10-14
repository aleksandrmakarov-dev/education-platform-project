import { Typography } from "@mui/material";
import React from "react";

interface QuizCardBodyProps {
  question: string;
  questionLabel?: string;
  answerLabel?: string;
  image?: string;
  answer: string;
  showAnswer?: boolean;
}

const QuizCardBody: React.FC<QuizCardBodyProps> = ({
  question,
  image,
  answer,
  showAnswer,
  questionLabel,
  answerLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center flex-1">
      {image && (
        <img
          src={image}
          className="w-96 h-52 object-cover object-center rounded-md"
        />
      )}
      <Typography variant="h5">
        {questionLabel}
        {question}
      </Typography>
      {showAnswer && (
        <Typography variant="h5">
          {answerLabel}
          {answer}
        </Typography>
      )}
    </div>
  );
};

export default QuizCardBody;
