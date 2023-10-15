import { TablePagination, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usePagination from "../../../hooks/shared/usePagination";
import { useState } from "react";
import DictionaryDataGridBody from "./DictionaryDataGridBody";
import CreateDictionaryDialog from "../../dialogs/dictionary/CreateDictionaryDialog";
import UpdateDictionaryDialog from "../../dialogs/dictionary/UpdateDictionaryDialog";
import { Dictionary } from "../../../lib/types";
import DeleteDictionaryDialog from "../../dialogs/dictionary/DeleteDictionaryDialog";
import useSearch from "../../../hooks/shared/useSearch";
import DataGridSearchForm from "../../forms/DataGridSearchForm";
import DictionaryDataGridEmpty from "./DictionaryDataGridEmpty";
import DictionaryDataGridLoading from "./DictionaryDataGridLoading";
import useGetDictionaryList from "../../../hooks/dictionary/useGetDictionaryList";

const DictionaryDataGrid = () => {
  const { pagination, setPagination } = usePagination();
  const { search, setSearch, resetSearch } = useSearch();

  const { data, isLoading, isError, isRefetching } = useGetDictionaryList({
    pagination,
    search,
  });

  const [selectedDictionary, setSelectedDictionary] = useState<
    Dictionary | undefined
  >(undefined);

  const onSelectItem = (value: Dictionary) => {
    if (value.id === selectedDictionary?.id) {
      setSelectedDictionary(undefined);
    } else {
      setSelectedDictionary(value);
    }
  };

  const onChangePageSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const limit = parseInt(e.target.value, 10);
    setPagination({ page: 1, limit: limit });
  };

  const onChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPagination({ ...pagination, page: page + 1 });
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <div className="flex gap-10 items-center justify-between">
          <div className="flex gap-1 items-center">
            <DataGridSearchForm
              search={search}
              setSearch={setSearch}
              resetSearch={resetSearch}
            />
            <UpdateDictionaryDialog
              dictionary={selectedDictionary}
              trigger={
                <IconButton size="small" disabled={!selectedDictionary}>
                  <EditIcon />
                </IconButton>
              }
            />
            <DeleteDictionaryDialog
              dictionary={selectedDictionary}
              trigger={
                <IconButton size="small" disabled={!selectedDictionary}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </div>
          <CreateDictionaryDialog
            trigger={
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                disableElevation
              >
                Create
              </Button>
            }
          />
        </div>
      </div>
      <DictionaryDataGridBody
        data={data?.items}
        isLoading={isLoading || isRefetching}
        isError={isError}
        onSelectItem={onSelectItem}
        selectedItem={selectedDictionary}
        emptyView={<DictionaryDataGridEmpty />}
        loadingView={<DictionaryDataGridLoading count={6} />}
      />
      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={data?.meta.count ?? 0}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangePageSize}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default DictionaryDataGrid;
