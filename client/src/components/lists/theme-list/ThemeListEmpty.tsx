import React from "react";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const ThemeListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <FindInPageIcon
        sx={{ width: "5rem", height: "5rem" }}
        className="text-gray-400"
      />
      <p className="text-gray-800 font-semibold">
        You'll find your themes here
      </p>
    </div>
  );
};

export default ThemeListEmpty;
