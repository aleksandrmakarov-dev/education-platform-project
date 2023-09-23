import React from "react";
import { Dictionary } from "../../../lib/constants";
import { Link } from "react-router-dom";
import DictionaryCardMenu from "./DictionaryCardMenu";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import ThemeList from "../../lists/theme-list/ThemeList";
import ThemeListEmptyCreate from "../../lists/theme-list/ThemeListEmptyCreate";

interface DictionaryCardProps {
  dictionary: Dictionary;
  onUpdateCallback: (
    id: string,
    values: DictionaryFormSchemaType
  ) => Promise<boolean>;
  onRemoveCallback: (id: string) => Promise<boolean>;
}

const DictionaryCard: React.FC<DictionaryCardProps> = ({
  dictionary,
  onRemoveCallback,
  onUpdateCallback,
}) => {
  return (
    <div className="bg-gray-50 rounded-md px-2 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700 uppercase">
          {dictionary.name}
        </p>
        <DictionaryCardMenu
          dictionary={dictionary}
          onUpdateCallback={onUpdateCallback}
          onRemoveCallback={onRemoveCallback}
        />
      </div>
      <ThemeList
        themes={dictionary.themes}
        emptyView={<ThemeListEmptyCreate />}
      />
      <div className="text-center">
        <Link
          to={`/dictionaries/${dictionary.id}`}
          className="p-2 text-blue-500 font-semibold hover:underline"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default DictionaryCard;
