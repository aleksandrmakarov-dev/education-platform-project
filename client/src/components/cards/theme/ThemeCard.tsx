import {
  Card,
  CardHeader,
  Checkbox,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Theme } from "../../../lib/types";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link } from "react-router-dom";

interface ThemeCardProps {
  data: Theme;
  url: string;
  isSelectedItem: boolean;
  onSelectItem: (value: Theme) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
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
        titleTypographyProps={{ fontSize: 18 }}
        subheader={new Date(data.createdAt).toDateString()}
        subheaderTypographyProps={{ fontSize: 14 }}
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
        {data.image ? (
          <img src={data.image} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ContentPasteRoundedIcon
              className="text-white"
              sx={{ fontSize: 72 }}
            />
          </div>
        )}
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-3"
        >
          {data.description}
        </Typography>
      </CardContent>
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
          {data.words?.length} word(s)
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ThemeCard;
