import {
  Card,
  CardHeader,
  Checkbox,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Dictionary } from "../../../lib/types";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link } from "react-router-dom";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

interface DictionaryCardProps {
  data: Dictionary;
  url: string;
  isSelectedItem: boolean;
  onSelectItem: (value: Dictionary) => void;
}

const DictionaryCard: React.FC<DictionaryCardProps> = ({
  data,
  url,
  isSelectedItem,
  onSelectItem,
}) => {
  return (
    <Card className="flex flex-col" variant="outlined" key={data.id}>
      <CardHeader
        title={
          <Link className="hover:underline" to={url}>
            {data.title}
          </Link>
        }
        titleTypographyProps={{ fontSize: "1.125rem" }}
        subheader={new Date(data.createdAt).toDateString()}
        subheaderTypographyProps={{ fontSize: "0.875rem" }}
        action={
          <Checkbox
            checked={isSelectedItem}
            onChange={() => onSelectItem(data)}
          />
        }
      />
      <CardMedia
        component="div"
        className="bg-blue-400 h-[196px] border-y border-gray-200"
      >
        <div className="flex items-center justify-center h-full">
          <FolderRoundedIcon className="text-white" sx={{ fontSize: 72 }} />
        </div>
      </CardMedia>
      <CardActions disableSpacing className="flex justify-between items-center">
        <Button
          href={url}
          startIcon={<OpenInNewRoundedIcon />}
          variant="contained"
          disableElevation
        >
          Open
        </Button>
        <Typography variant="button" color="text.secondary">
          {data.themes?.length || 0} theme(s)
        </Typography>
      </CardActions>
    </Card>
  );
};

export default DictionaryCard;
