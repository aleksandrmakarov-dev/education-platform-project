import { DocumentMultipleFilled } from "@fluentui/react-icons";
import React from "react";

const ThemeListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <DocumentMultipleFilled className="h-16 w-16 text-gray-300" />
      <p className="text-gray-800 font-semibold">
        You'll find your themes here
      </p>
    </div>
  );
};

export default ThemeListEmpty;
