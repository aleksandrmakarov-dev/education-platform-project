import React from "react";
import { Dictionary } from "../../../lib/types";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

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
    return (
      <TableRow>
        <TableCell colSpan={5}>{emptyView}</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {data.map((item) => {
        const isSelectedItem = item.id === selectedItem?.id;

        return (
          <TableRow
            role="checkbox"
            key={item.id}
            onClick={() => onSelectItem(item)}
            selected={isSelectedItem}
            aria-checked={isSelectedItem}
            hover
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isSelectedItem} />
            </TableCell>
            <TableCell align="right">
              <Link
                to={`/dictionaries/${item.slug}`}
                className="text-blue-500 hover:underline"
              >
                {item.title}
              </Link>
            </TableCell>
            <TableCell align="right">
              {new Date(item.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell align="right">{item.slug}</TableCell>
            <TableCell align="right">{item.themes?.length}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default DictionaryDataGridBody;
