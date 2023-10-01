import React from "react";
import { Theme } from "../../../lib/types";
import ThemeDataGridLoading from "./ThemeDataGridLoading";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link } from "react-router-dom";

interface ThemeDataGridBodyProps {
  data?: Theme[];
  isLoading: boolean;
  isError: boolean;
  selectedItem?: Theme;
  onSelectItem: (value: Theme) => void;
  loadingView?: JSX.Element;
  emptyView?: JSX.Element;
  errorView?: JSX.Element;
}

const ThemeDataGridBody: React.FC<ThemeDataGridBodyProps> = ({
  data,
  isLoading,
  selectedItem,
  onSelectItem,
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
    <div className="grid grid-cols-3 gap-5">
      {data.map((item) => {
        const isSelectedItem = item.id === selectedItem?.id;

        const url = `/dictionaries/${item.dictionary}/themes/${item.id}`;

        return (
          <Card className="flex flex-col" variant="outlined" key={item.id}>
            <CardHeader
              title={
                <Link className="hover:underline" to={url}>
                  {item.title}
                </Link>
              }
              titleTypographyProps={{ fontSize: 18 }}
              subheader={new Date(item.createdAt).toDateString()}
              subheaderTypographyProps={{ fontSize: 14 }}
              action={
                <Checkbox
                  checked={isSelectedItem}
                  onChange={() => onSelectItem(item)}
                />
              }
            />
            <CardMedia
              component="div"
              className="bg-blue-400 h-[196px] border-y border-gray-200"
            >
              {item.image ? (
                <img src={item.image} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ContentPasteRoundedIcon
                    className="text-white"
                    fontSize="large"
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
                {item.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                href={url}
                startIcon={<OpenInNewRoundedIcon />}
                variant="contained"
                disableElevation
              >
                Open
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default ThemeDataGridBody;
