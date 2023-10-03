import React from "react";
import { Word } from "../../../lib/types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface WordCardProps {
  data: Word;
}

const WordCard: React.FC<WordCardProps> = ({ data }) => {
  return (
    <Card key={data.id} variant="outlined">
      <div className="flex gap-5">
        <CardMedia
          component="div"
          className="border-r border-gray-200 flex items-center justify-center"
        >
          <div className="w-64 h-full">
            {data.image ? (
              <img src={data.image} className="w-full h-48 object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <ImageIcon className="text-white" sx={{ fontSize: 72 }} />
              </div>
            )}
          </div>
        </CardMedia>
        <CardContent className="flex-1">
          <CardHeader title={data.text} subheader={data.translation} />
          {data.context && data.contextTranslation && (
            <div className="px-4">
              <Typography variant="subtitle1" className="underline">
                Example:
              </Typography>
              <Typography variant="h6">{data.context}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data.contextTranslation}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions></CardActions>
      </div>
    </Card>
  );
};

export default WordCard;
