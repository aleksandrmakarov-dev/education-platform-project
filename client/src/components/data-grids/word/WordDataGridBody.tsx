import React from "react";
import { Word } from "../../../lib/types";
import { Card, CardHeader, CardMedia } from "@mui/material";
import WordCard from "../../cards/word/WordCard";
import Carousel from "../../shared/carousel/Carousel";
import ImageIcon from "@mui/icons-material/Image";

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
  isError,
  loadingView,
  emptyView,
  errorView,
}) => {
  if (isLoading) {
    return loadingView;
  }

  if (!data || data.length === 0) {
    return emptyView;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mx-auto">
        <Carousel count={data.length}>
          {data.map((item) => (
            <Card
              key={item.id}
              variant="outlined"
              className="flex flex-col items-center justify-center h-72"
            >
              <CardMedia className="w-64 h-64 flex-1" component="div">
                <div>
                  {item.image ? (
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <ImageIcon className="text-white" sx={{ fontSize: 72 }} />
                    </div>
                  )}
                </div>
              </CardMedia>
              <CardHeader title={item.text} subheader={item.translation} />
            </Card>
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
    </div>
  );
};

export default WordDataGridBody;
