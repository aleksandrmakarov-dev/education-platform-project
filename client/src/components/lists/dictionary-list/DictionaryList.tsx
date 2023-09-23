import React from "react";
import { Dictionary } from "../../../lib/constants";
import DictionaryCard from "../../cards/dictionary-card/DictionaryCard";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

interface DictionaryListProps {
  dictionaries?: Dictionary[];
  emptyView?: React.ReactNode;
  errorView?: React.ReactNode;
  onUpdateCallback: (
    id: string,
    values: DictionaryFormSchemaType
  ) => Promise<boolean>;
  onRemoveCallback: (id: string) => Promise<boolean>;
}

const DictionaryList: React.FC<DictionaryListProps> = ({
  dictionaries,
  emptyView,
  errorView,
  onUpdateCallback,
  onRemoveCallback,
}) => {
  if (!dictionaries || dictionaries.length === 0) {
    return emptyView;
  }

  return (
    <div className="flex flex-col gap-2">
      {dictionaries.map((item, i) => (
        <DictionaryCard
          key={`dictionary-${i}`}
          dictionary={item}
          onUpdateCallback={onUpdateCallback}
          onRemoveCallback={onRemoveCallback}
        />
      ))}
    </div>
  );
};

export default DictionaryList;
