import { Box, Skeleton } from "@mui/material";
import React from "react";

const HeaderSkeleton = () => {
  return (
    <Box sx={{ width: "15rem" }}>
      <Skeleton variant="text" sx={{ height: "2.125rem", mt: 0 }} />
      <Skeleton variant="text" />
    </Box>
  );
};

export default HeaderSkeleton;
