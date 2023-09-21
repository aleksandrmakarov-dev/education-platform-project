import { Fire24Filled } from "@fluentui/react-icons";
import React from "react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Fire24Filled className="text-red-500" />
      <span className="text-lg font-semibold">AppName</span>
    </div>
  );
};

export default AppLogo;
