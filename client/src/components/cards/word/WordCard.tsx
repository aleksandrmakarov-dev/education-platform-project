import React from "react";
import { Word } from "../../../lib/types";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UpdateWordDialog from "../../dialogs/word/UpdateWordDialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteWordDialog from "../../dialogs/word/DeleteWordDialog";
import PlaySoundButton from "../../shared/ui/PlaySoundButton";
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";

interface WordCardProps {
  data: Word;
}

const WordCard: React.FC<WordCardProps> = ({ data }) => {
  return (
    <Card key={data.id} variant="outlined">
      <div className="flex gap-5">
        <div className="border-r border-gray-200 flex items-center justify-center h-48 w-64 bg-gray-200">
          {data.image ? (
            <img
              src={data.image}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <ImageIcon className="text-gray-400" sx={{ fontSize: 72 }} />
          )}
        </div>
        <CardContent className="flex-1 grid grid-cols-[1fr_0.5rem_1fr] items-center gap-5">
          <div className="px-4">
            <Typography variant="h6" className="flex gap-1 items-center">
              <span>{data.text}</span>
              <PlaySoundButton url={data.textAudioUrl} />
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              className="flex gap-1 items-center"
            >
              <span>{data.definition}</span>
              <PlaySoundButton size="small" url={data.definitionAudioUrl} />
            </Typography>
          </div>
        </CardContent>
        <ProtectionWrapper roles={["admin"]}>
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
        </ProtectionWrapper>
      </div>
    </Card>
  );
};

export default WordCard;
