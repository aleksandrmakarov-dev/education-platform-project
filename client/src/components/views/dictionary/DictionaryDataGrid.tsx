import { IconButton, Button, Pagination } from "@mui/material";
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
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";

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

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPagination({ ...pagination, page: page });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="mb-2">
        <div className="flex gap-x-10 gap-y-2 items-center justify-between flex-wrap">
          <div className="flex gap-x-2 items-center justify-between w-full sm:w-auto sm:gap-x-10">
            <DataGridSearchForm
              search={search}
              setSearch={setSearch}
              resetSearch={resetSearch}
            />
            <ProtectionWrapper roles={["admin"]}>
              <div>
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
            </ProtectionWrapper>
          </div>
          <ProtectionWrapper roles={["admin"]}>
            <CreateDictionaryDialog
              trigger={
                <Button
                  className="w-full sm:w-auto"
                  startIcon={<AddIcon />}
                  variant="contained"
                  disableElevation
                >
                  Create
                </Button>
              }
            />
          </ProtectionWrapper>
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
      <div className="flex justify-end">
        <Pagination
          defaultPage={1}
          count={Math.ceil((data?.meta.count ?? 1) / pagination.limit)}
          page={pagination.page}
          onChange={onChangePage}
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default DictionaryDataGrid;
