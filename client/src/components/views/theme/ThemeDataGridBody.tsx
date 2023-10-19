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
  baseUrl: string;
}

const ThemeDataGridBody: React.FC<ThemeDataGridBodyProps> = ({
  data,
  isLoading,
  selectedItem,
  onSelectItem,
  loadingView,
  emptyView,
  baseUrl,
}) => {
  if (isLoading) {
    return loadingView;
  }

  if (!data || data.length === 0) {
    return emptyView;
  }

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5">
      {data.map((item) => (
        <ThemeCard
          key={item.id}
          onSelectItem={onSelectItem}
          data={item}
          url={`${baseUrl}/themes/${item.slug}`}
          isSelectedItem={item.id === selectedItem?.id}
        />
      ))}
    </div>
  );
};

export default ThemeDataGridBody;
