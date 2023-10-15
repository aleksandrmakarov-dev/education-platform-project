import { TablePagination, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usePagination from "../../../hooks/shared/usePagination";
import { useState } from "react";
import ThemeDataGridBody from "./ThemeDataGridBody";
import CreateThemeDialog from "../../dialogs/theme/CreateThemeDialog";
import UpdateThemeDialog from "../../dialogs/theme/UpdateThemeDialog";
import { Theme } from "../../../lib/types";
import DeleteThemeDialog from "../../dialogs/theme/DeleteThemeDialog";
import useSearch from "../../../hooks/shared/useSearch";
import DataGridSearchForm from "../../forms/DataGridSearchForm";
import ThemeDataGridEmpty from "./ThemeDataGridEmpty";
import ThemeDataGridLoading from "./ThemeDataGridLoading";
import useGetThemeListByDictionaryId from "../../../hooks/dictionary/useGetThemeListByDictionaryId";

interface ThemeDataGridProps {
  dictionaryId: string;
  baseUrl: string;
}

const ThemeDataGrid: React.FC<ThemeDataGridProps> = ({
  dictionaryId,
  baseUrl,
}) => {
  const { pagination, setPagination } = usePagination();
  const { search, setSearch, resetSearch } = useSearch();

  const { data, isLoading, isError, isRefetching } =
    useGetThemeListByDictionaryId({
      dictionaryId,
      pagination,
      search,
    });

  const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>(
    undefined
  );

  const onSelectItem = (value: Theme) => {
    if (value.id === selectedTheme?.id) {
      setSelectedTheme(undefined);
    } else {
      setSelectedTheme(value);
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
            <UpdateThemeDialog
              trigger={
                <IconButton size="small" disabled={!selectedTheme}>
                  <EditIcon />
                </IconButton>
              }
              theme={selectedTheme}
            />
            <DeleteThemeDialog
              trigger={
                <IconButton size="small" disabled={!selectedTheme}>
                  <DeleteIcon />
                </IconButton>
              }
              theme={selectedTheme}
            />
          </div>
          <CreateThemeDialog
            dictionary={dictionaryId}
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
      <ThemeDataGridBody
        data={data?.items}
        isLoading={isLoading || isRefetching}
        isError={isError}
        onSelectItem={onSelectItem}
        selectedItem={selectedTheme}
        emptyView={<ThemeDataGridEmpty />}
        loadingView={<ThemeDataGridLoading count={6} />}
        baseUrl={baseUrl}
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

export default ThemeDataGrid;
