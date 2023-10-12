import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Word } from "../../../lib/types";
import FlipAnimation from "../../shared/animations/FlipAnimation";

interface WordFlashCardProps {
  data: Word;
  showContext?: boolean;
}

const WordFlashCard: React.FC<WordFlashCardProps> = ({ data, showContext }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onChangeState = () => {
    setOpen(!open);
  };

  return (
    <FlipAnimation>
      <div onClick={onChangeState}>
        <Paper
          variant="outlined"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          className="h-[26rem] w-full flex items-center justify-center cursor-pointer"
        >
          {open ? (
            <div className="flex flex-col gap-2 text-center">
              {data.image && (
                <img
                  src={data.image}
                  className="w-96 h-72 object-cover object-center rounded-md"
                />
              )}
              <Typography variant="h5">{data.definition}</Typography>
              {showContext && (
                <Typography variant="subtitle1" color="text.secondary">
                  {data.definitionContext}
                </Typography>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-center">
              <Typography variant="h5">{data.text}</Typography>
              {showContext && (
                <Typography variant="subtitle1" color="text.secondary">
                  {data.textContext}
                </Typography>
              )}
            </div>
          )}
        </Paper>
      </div>
    </FlipAnimation>
  );
};

export default WordFlashCard;
