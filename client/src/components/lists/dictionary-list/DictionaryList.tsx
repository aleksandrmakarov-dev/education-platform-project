import React from "react";
import DictionaryCard from "../../cards/dictionary-card/DictionaryCard";
import { Dictionary } from "../../../lib/constants";

interface DictionaryListProps {
  dictionaries?: Dictionary[];
  isDictionariesLoading: boolean;
  isDictionariesError: boolean;
  emptyView?: React.ReactNode;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
}

const DictionaryList: React.FC<DictionaryListProps> = ({
  dictionaries,
  isDictionariesError,
  isDictionariesLoading,
  emptyView,
  loadingView,
  errorView,
}) => {
  if (isDictionariesLoading) {
    return loadingView;
  }

  if (isDictionariesError) {
    return errorView;
  }

  if (!dictionaries || dictionaries.length === 0) {
    return emptyView;
  }

  return (
    <div className="flex flex-col gap-2">
      {dictionaries.map((item, i) => (
        <DictionaryCard key={item.id} dictionary={item} />
      ))}
    </div>
  );
};

export default DictionaryList;
