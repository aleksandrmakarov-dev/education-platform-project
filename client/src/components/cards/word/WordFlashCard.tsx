import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Word } from "../../../lib/types";
import FlipAnimation from "../../shared/animations/FlipAnimation";
import PlaySoundButton from "../../shared/ui/PlaySoundButton";

interface WordFlashCardProps {
  data: Word;
}

const WordFlashCard: React.FC<WordFlashCardProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onChangeState = () => {
    setOpen(!open);
  };

  return (
    <FlipAnimation open={open}>
      <Paper
        variant="outlined"
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        className="h-[26rem] w-full flex flex-col cursor-pointer p-5 gap-y-2"
      >
        <div className="flex justify-end">
          <PlaySoundButton
            url={open ? data.definitionAudioUrl : data.textAudioUrl}
          />
        </div>
        {open ? (
          <div
            className="flex flex-col gap-2 text-center items-center justify-center flex-1"
            onClick={onChangeState}
          >
            {data.image && (
              <img
                src={data.image}
                className="w-96 h-72 object-cover object-center rounded-md"
              />
            )}
            <Typography variant="h5">{data.definition}</Typography>
          </div>
        ) : (
          <div
            className="flex text-center items-center justify-center flex-1"
            onClick={onChangeState}
          >
            <Typography variant="h5" className="flex gap-1 items-center">
              {data.text}
            </Typography>
          </div>
        )}
      </Paper>
    </FlipAnimation>
  );
};

export default WordFlashCard;
