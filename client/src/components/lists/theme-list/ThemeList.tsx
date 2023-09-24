import React from "react";
import ThemeCard from "../../cards/ThemeCard";
import { Theme } from "../../../lib/constants";

interface ThemeListProps {
  themes?: Theme[];
  isThemesLoading?: boolean;
  isThemesError?: boolean;
  emptyView?: React.ReactNode;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
}

const ThemeList: React.FC<ThemeListProps> = ({
  themes,
  isThemesLoading,
  isThemesError,
  emptyView,
  loadingView,
  errorView,
}) => {
  if (isThemesLoading) {
    return loadingView;
  }

  if (isThemesError) {
    return errorView;
  }

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
