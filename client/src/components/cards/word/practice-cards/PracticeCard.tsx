import React, { useState } from "react";
import { Word } from "../../../../lib/types";
import PracticeCardBody from "./PracticeCardBody";
import { Paper } from "@mui/material";
import PracticeMultipleChoice from "./PracticeMultipleChoice";

export type PracticeCardState = "idle" | "corrent" | "wrong" | "skipped";

interface PracticeCardProps {
  data: Word;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ data }) => {
  const [state, setState] = useState<PracticeCardState>("idle");

  const onAnswerGiven = (answer: string) => {};

  return (
    <Paper
      variant="outlined"
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
      className="h-[26] w-full p-10 flex flex-col gap-5"
    >
      <PracticeCardBody data={data} />
      {/* <PracticeWrite onAnswerGiven={onAnswerGiven} /> */}
      <PracticeMultipleChoice
        onAnswerGiven={onAnswerGiven}
        options={[data.text, "option 2", "option 3", "option 4"]}
      />
    </Paper>
  );
};

export default PracticeCard;
