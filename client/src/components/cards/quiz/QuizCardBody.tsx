import { Typography } from "@mui/material";
import React from "react";
import PlaySoundButton from "../../shared/ui/PlaySoundButton";

interface QuizCardBodyProps {
  question: string;
  questionAudioUrl?: string;
  questionLabel?: string;
  answerLabel?: string;
  image?: string;
  answer: string;
  answerAudioUrl?: string;
  showAnswer?: boolean;
}

const QuizCardBody: React.FC<QuizCardBodyProps> = ({
  question,
  image,
  answer,
  showAnswer,
  questionLabel,
  answerLabel,
  questionAudioUrl,
  answerAudioUrl,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center flex-1">
      {image && (
        <img
          src={image}
          className="w-96 h-52 object-cover object-center rounded-md"
        />
      )}
      <Typography
        variant="h5"
        className="flex flex-wrap justify-center gap-1 items-center"
      >
        <span>{questionLabel}</span>
        <div className="flex gap-1 items-center flex-wrap justify-center">
          <span>{question}</span>
          <PlaySoundButton url={questionAudioUrl} />
        </div>
      </Typography>
      {showAnswer && (
        <Typography
          variant="h5"
          className="flex flex-wrap justify-center gap-1 items-center"
        >
          <span> {answerLabel}</span>
          <div className="flex gap-1 items-center flex-wrap justify-center">
            <span>{answer}</span>
            <PlaySoundButton url={answerAudioUrl} />
          </div>
        </Typography>
      )}
    </div>
  );
};

export default QuizCardBody;
