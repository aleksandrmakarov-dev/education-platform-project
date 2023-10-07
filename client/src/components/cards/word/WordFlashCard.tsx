import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Word } from "../../../lib/types";
import FlipAnimation from "../../shared/animations/FlipAnimation";

interface WordFlashCardProps {
  data: Word;
}

const WordFlashCard: React.FC<WordFlashCardProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onChangeState = () => {
    setOpen(!open);
  };

  return (
    <div onClick={onChangeState}>
      <FlipAnimation>
        <Paper
          variant="outlined"
          className="h-96 w-full flex items-center justify-center cursor-pointer"
        >
          {open ? (
            <div className="flex flex-col gap-2 text-center">
              {data.image && (
                <img src={data.image} className="w-72 h-48 object-cover" />
              )}
              <Typography variant="h5">{data.translation}</Typography>
            </div>
          ) : (
            <Typography variant="h5">{data.text}</Typography>
          )}
        </Paper>
      </FlipAnimation>
    </div>
  );
};

export default WordFlashCard;
