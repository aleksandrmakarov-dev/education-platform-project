import React from "react";
import { Dictionary } from "../../../lib/types";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import DictionaryCard from "../../cards/dictionary/DictionaryCard";

interface DictionaryDataGridBodyProps {
  data?: Dictionary[];
  isLoading: boolean;
  isError: boolean;
  selectedItem?: Dictionary;
  onSelectItem: (value: Dictionary) => void;
  emptyView?: JSX.Element;
  loadingView?: JSX.Element;
  errorView?: JSX.Element;
}

const DictionaryDataGridBody: React.FC<DictionaryDataGridBodyProps> = ({
  data,
  isLoading,
  selectedItem,
  onSelectItem,
  emptyView,
  loadingView,
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
        <DictionaryCard
          key={item.id}
          onSelectItem={onSelectItem}
          data={item}
          url={`/dictionaries/${item.slug}`}
          isSelectedItem={item.id === selectedItem?.id}
        />
      ))}
    </div>
  );
};

export default DictionaryDataGridBody;
