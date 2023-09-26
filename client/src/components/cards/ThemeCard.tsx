import React from "react";
import { Theme } from "../../lib/constants";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <Card variant="outlined" className="flex flex-col">
      <div className="h-36 bg-gray-200 p-4 flex items-center justify-center">
        <TopicIcon
          className="text-white"
          sx={{ width: "4rem", height: "4rem" }}
        />
      </div>
      <CardHeader
        title={theme.title}
        subheader={theme.description}
        className="flex-1"
      />
      <CardActions>
        <div className="w-full flex items-center justify-between p-2">
          <Button
            variant="contained"
            disableElevation
            startIcon={<OpenInNewIcon />}
            href={`/dictionaries/${theme.dictionary}/themes/${theme.id}`}
          >
            Open
          </Button>
          <p className="text-sm uppercase">{theme.count} word(s)</p>
        </div>
      </CardActions>
    </Card>
  );
};

export default ThemeCard;
