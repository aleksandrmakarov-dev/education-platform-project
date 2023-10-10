import { Button, Paper, TextField, Typography } from "@mui/material";
import { Word } from "../../../../lib/types";
import { useState } from "react";

interface WordWriteCardProps {
  data: Word;
}

const WordWriteCard: React.FC<WordWriteCardProps> = ({ data }) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
      className="h-[26rem] p-10"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <Typography variant="subtitle1" color="text.secondary">
            Definition
          </Typography>
          <Typography variant="h3">{data.definition}</Typography>
          {showHint ? (
            <>
              <Typography variant="subtitle2" color="text.secondary">
                HINT
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data.text[0] + data.text.slice(1).replace(/./g, " _")}
              </Typography>
            </>
          ) : (
            <Button type="button" onClick={() => setShowHint(!showHint)}>
              Show hint
            </Button>
          )}
        </div>
        <form className="flex flex-col gap-2">
          <TextField label="Your answer" size="small" fullWidth />
          <div className="flex justify-end gap-2">
            <Button>Don't know?</Button>
            <Button variant="contained" disableElevation>
              Answer
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default WordWriteCard;
