import React from "react";
import { Dictionary } from "../../../lib/constants";
import ThemeList from "../../lists/theme-list/ThemeList";
import ThemeListEmptyCreate from "../../lists/theme-list/ThemeListEmptyCreate";
import { IconButton, Link } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DictionaryCardMenu from "../../menus/DictionaryCardMenu";

interface DictionaryCardProps {
  dictionary: Dictionary;
}

const DictionaryCard: React.FC<DictionaryCardProps> = ({ dictionary }) => {
  return (
    <div className="bg-gray-50 rounded-md px-2 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700 uppercase">
          {dictionary.title}
        </p>
        <DictionaryCardMenu
          dictionary={dictionary}
          trigger={
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </div>
      <ThemeList
        themes={dictionary.themes}
        emptyView={<ThemeListEmptyCreate dictionaryId={dictionary.id} />}
      />
      <div className="text-center">
        <Link
          href={`/dictionaries/${dictionary.id}`}
          className="p-2 text-blue-500 font-semibold hover:underline"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default DictionaryCard;
