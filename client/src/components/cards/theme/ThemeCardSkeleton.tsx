import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";

const ThemeCardSkeleton = () => {
  return (
    <Card className="flex flex-col" variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" sx={{ fontSize: "1.125rem" }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />}
      />
      <CardMedia component="div" className="border-y border-gray-200">
        <Skeleton variant="rectangular" sx={{ height: "12.25rem" }} />
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="rounded" sx={{ height: "3rem" }} />
      </CardContent>
      <CardActions disableSpacing className="flex justify-end items-center">
        <Skeleton variant="text" sx={{ width: "4rem", fontSize: "1.25rem" }} />
      </CardActions>
    </Card>
  );
};

export default ThemeCardSkeleton;
