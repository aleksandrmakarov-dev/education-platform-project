import React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <LocalFireDepartmentIcon className="text-red-500" />
      <span className="text-lg font-semibold">AppName</span>
    </div>
  );
};

export default AppLogo;
