import { Button } from "@mui/material";
import React from "react";

interface PracticeMultipleChoiceProps {
  options: string[];
  onAnswerGiven: (answer: string) => void;
}

const PracticeMultipleChoice: React.FC<PracticeMultipleChoiceProps> = ({
  options,
  onAnswerGiven,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {options.map((option) => (
        <Button
          type="button"
          onClick={() => onAnswerGiven(option)}
          size="large"
          variant="outlined"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default PracticeMultipleChoice;
