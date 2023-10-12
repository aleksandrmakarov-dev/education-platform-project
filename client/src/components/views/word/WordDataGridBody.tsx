import React, { useState } from "react";
import { Word } from "../../../lib/types";
import WordCard from "../../cards/word/WordCard";
import Carousel from "../../shared/carousel/Carousel";
import WordFlashCard from "../../cards/word/WordFlashCard";
import { Checkbox, FormControlLabel } from "@mui/material";

interface WordDataGridBodyProps {
  data?: Word[];
  isLoading: boolean;
  isError: boolean;
  loadingView?: JSX.Element;
  emptyView?: JSX.Element;
  errorView?: JSX.Element;
}

const WordDataGridBody: React.FC<WordDataGridBodyProps> = ({
  data,
  isLoading,
  loadingView,
  emptyView,
}) => {
  const [showContext, setShowContext] = useState<boolean>(false);

  if (isLoading) {
    return loadingView;
  }

  if (!data || data.length === 0) {
    return emptyView;
  }

  return (
    <>
      <div className="flex justify-center">
        <Carousel count={data.length} showProgress>
          {data.map((item) => (
            <WordFlashCard
              data={item}
              key={item.id}
              showContext={showContext}
            />
          ))}
        </Carousel>
      </div>
      <div>
        <h5 className="mb-2 text-lg font-semibold">
          Words in theme ({data.length})
        </h5>
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <WordCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WordDataGridBody;
