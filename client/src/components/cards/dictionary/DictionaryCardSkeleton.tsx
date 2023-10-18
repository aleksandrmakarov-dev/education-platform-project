import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Skeleton,
} from "@mui/material";

const DictionaryCardSkeleton = () => {
  return (
    <Card className="flex flex-col" variant="outlined">
      <CardHeader
        title={<Skeleton variant="text" sx={{ fontSize: "1.125rem" }} />}
        subheader={<Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />}
      />
      <CardMedia component="div" className="border-y border-gray-200">
        <Skeleton variant="rectangular" sx={{ height: "12.25rem" }} />
      </CardMedia>
      <CardActions disableSpacing className="flex justify-end items-center">
        <Skeleton variant="text" sx={{ width: "4rem", fontSize: "1.25rem" }} />
      </CardActions>
    </Card>
  );
};

export default DictionaryCardSkeleton;
