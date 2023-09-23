import React from "react";
import ThemeCard from "../../cards/ThemeCard";
import { Theme } from "../../../lib/constants";

interface ThemeListProps {
  themes?: Theme[];
  emptyView?: React.ReactNode;
  errorView?: React.ReactNode;
}

const ThemeList: React.FC<ThemeListProps> = ({
  themes,
  emptyView,
  errorView,
}) => {
  if (!themes || themes.length === 0) {
    return emptyView;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes?.map((theme) => (
        <ThemeCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
};

export default ThemeList;
