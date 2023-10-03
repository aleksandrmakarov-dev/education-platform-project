import React from "react";
import { Theme } from "../../../lib/types";
import ThemeCard from "../../cards/theme/ThemeCard";

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
      {data.map((item) => (
        <ThemeCard
          key={item.id}
          onSelectItem={onSelectItem}
          data={item}
          url={`/dictionaries/${item.dictionary}/themes/${item.id}`}
          isSelectedItem={item.id === selectedItem?.id}
        />
      ))}
    </div>
  );
};

export default ThemeDataGridBody;
