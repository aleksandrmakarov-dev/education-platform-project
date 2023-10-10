import React from "react";
import { Word } from "../../../lib/types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UpdateWordDialog from "../../dialogs/word/UpdateWordDialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteWordDialog from "../../dialogs/word/DeleteWordDialog";

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
          <div className="w-64 h-48">
            {data.image ? (
              <img
                src={data.image}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <ImageIcon className="text-white" sx={{ fontSize: 72 }} />
              </div>
            )}
          </div>
        </CardMedia>
        <CardContent className="flex-1 grid grid-cols-[1fr_0.5rem_1fr] items-center gap-5">
          <div className="px-4">
            <Typography variant="h6">{data.text}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.definition}
            </Typography>
          </div>
          {data.textContext && data.definitionContext && (
            <>
              <Divider orientation="vertical" flexItem />
              <div>
                <Typography variant="subtitle1" className="underline">
                  Example:
                </Typography>
                <Typography variant="h6">{data.textContext}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {data.definitionContext}
                </Typography>
              </div>
            </>
          )}
        </CardContent>
        <CardActions>
          <div className="h-full">
            <UpdateWordDialog
              trigger={
                <IconButton size="small">
                  <EditRoundedIcon />
                </IconButton>
              }
              word={data}
            />
            <DeleteWordDialog
              trigger={
                <IconButton size="small">
                  <DeleteRoundedIcon />
                </IconButton>
              }
              word={data}
            />
          </div>
        </CardActions>
      </div>
    </Card>
  );
};

export default WordCard;
