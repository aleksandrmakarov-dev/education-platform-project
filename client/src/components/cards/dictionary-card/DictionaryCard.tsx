import React from "react";
import { Dictionary } from "../../../lib/constants";
import { Link } from "react-router-dom";
import ThemeCard from "../ThemeCard";
import { Add24Filled, DocumentMultipleFilled } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import DictionaryCardMenu from "./DictionaryCardMenu";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

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
    <div className="bg-gray-50 rounded-md px-2 py-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-gray-700 uppercase">
          {dictionary.name}
        </p>
        <DictionaryCardMenu
          dictionary={dictionary}
          onUpdateCallback={onUpdateCallback}
          onRemoveCallback={onRemoveCallback}
        />
      </div>
      {dictionary.themes && dictionary.themes.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            {dictionary.themes?.map((theme, i) => (
              <ThemeCard key={`${dictionary.name}-${i}`} theme={theme} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="p-2 text-blue-500 font-semibold hover:underline"
            >
              Show All
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-between gap-2">
          <DocumentMultipleFilled className="h-16 w-16 text-gray-300" />
          <p className="text-gray-800 font-semibold">
            You'll find your themes here
          </p>
          <Button appearance="primary" as="a" href="/" icon={<Add24Filled />}>
            Create Theme
          </Button>
        </div>
      )}
    </div>
  );
};

export default DictionaryCard;
