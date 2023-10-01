import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import usePagination from "../../../hooks/usePagination";
import { getDictionaries } from "../../../services/dictionaries.service";
import { useEffect, useState } from "react";
import DictionaryDataGridBody from "./DictionaryDataGridBody";

import CreateDictionaryDialog from "../../dialogs/dictionary/CreateDictionaryDialog";
import UpdateDictionaryDialog from "../../dialogs/dictionary/UpdateDictionaryDialog";
import { DictionariesPage, Dictionary } from "../../../lib/types";
import DeleteDictionaryDialog from "../../dialogs/dictionary/DeleteDictionaryDialog";
import useSearch from "../../../hooks/useSearch";
import DataGridSearchForm from "../../forms/DataGridSearchForm";
import DictionaryDataGridEmpty from "./DictionaryDataGridEmpty";
import DictionaryDataGridLoading from "./DictionaryDataGridLoading";

const Columns = ["Title", "Created At", "Slug", "Themes"];

const DictionaryDataGrid = () => {
  const { pagination, setPagination } = usePagination();
  const { search, setSearch, resetSearch } = useSearch();

  const [selectedDictionary, setSelectedDictionary] = useState<
    Dictionary | undefined
  >(undefined);

  const initialData: DictionariesPage = { items: [], meta: { count: 0 } };

  const getDictionariesQuery = useQuery({
    queryKey: ["dictionaries", pagination, search],
    queryFn: async () => {
      const params = { ...pagination, ...search };
      return await getDictionaries(params);
    },
    initialData: initialData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    cacheTime: 0,
  });

  useEffect(() => {
    getDictionariesQuery.refetch();
  }, [pagination, search]);

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
        <Typography variant="h5" className="mb-2">
          Dictionaries
        </Typography>
        <div className="flex gap-10 items-center justify-between">
          <div className="flex gap-1 items-center">
            <DataGridSearchForm
              search={search}
              setSearch={setSearch}
              resetSearch={resetSearch}
            />
            <UpdateDictionaryDialog
              trigger={
                <IconButton size="small" disabled={!selectedDictionary}>
                  <EditIcon />
                </IconButton>
              }
              dictionary={selectedDictionary}
            />
            <DeleteDictionaryDialog
              trigger={
                <IconButton size="small" disabled={!selectedDictionary}>
                  <DeleteIcon />
                </IconButton>
              }
              dictionary={selectedDictionary}
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
      <Paper variant="outlined">
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {Columns.map((col) => (
                  <TableCell align="right" key={col}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <DictionaryDataGridBody
                data={getDictionariesQuery.data?.items}
                isLoading={getDictionariesQuery.isLoading}
                isError={getDictionariesQuery.isError}
                selectedItem={selectedDictionary}
                onSelectItem={onSelectItem}
                emptyView={<DictionaryDataGridEmpty />}
                loadingView={<DictionaryDataGridLoading />}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 12, 24]}
          component="div"
          count={getDictionariesQuery.data.meta.count}
          rowsPerPage={pagination.limit}
          page={pagination.page - 1}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangePageSize}
          showFirstButton
          showLastButton
        />
      </Paper>
    </div>
  );
};

export default DictionaryDataGrid;
