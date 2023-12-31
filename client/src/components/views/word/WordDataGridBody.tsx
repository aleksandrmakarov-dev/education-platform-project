import React from "react";
import { Word } from "../../../lib/types";
import WordCard from "../../cards/word/WordCard";
import Carousel from "../../shared/carousel/Carousel";
import WordFlashCard from "../../cards/word/WordFlashCard";
import { AnimatePresence, motion } from "framer-motion";

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
  if (isLoading) {
    return loadingView;
  }

  if (!data || data.length === 0) {
    return emptyView;
  }

  // Extract animation to its own component
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };

  return (
    <>
      <div className="flex justify-center">
        <Carousel count={data.length}>
          {data.map((item) => (
            <WordFlashCard data={item} key={item.id} />
          ))}
        </Carousel>
      </div>
      <div>
        <h5 className="mb-2 text-lg font-semibold">
          Words in theme ({data.length})
        </h5>
        <ul className="flex flex-col gap-3">
          <AnimatePresence>
            {data.map((item) => (
              <motion.li {...animations} layout key={item.id}>
                <WordCard data={item} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
};

export default WordDataGridBody;
