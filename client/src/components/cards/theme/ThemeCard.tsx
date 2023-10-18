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
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";

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
        titleTypographyProps={{ fontSize: "1.125rem" }}
        subheader={new Date(data.createdAt).toDateString()}
        subheaderTypographyProps={{ fontSize: "0.875rem" }}
        action={
          <ProtectionWrapper roles={["admin"]}>
            <Checkbox
              checked={isSelectedItem}
              onChange={() => onSelectItem(data)}
            />
          </ProtectionWrapper>
        }
      />
      <div className="bg-blue-400 h-48 border-y border-gray-200 flex items-center justify-center">
        {data.image ? (
          <img
            src={data.image}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <ContentPasteRoundedIcon
            className="text-white"
            sx={{ fontSize: 72 }}
          />
        )}
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body1"
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
