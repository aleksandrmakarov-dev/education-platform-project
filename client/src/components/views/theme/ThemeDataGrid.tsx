import { IconButton, Button, Pagination } from "@mui/material";
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
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";

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
            </ProtectionWrapper>
          </div>
          <ProtectionWrapper roles={["admin"]}>
            <CreateThemeDialog
              dictionary={dictionaryId}
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
      <div className="flex justify-end">
        <Pagination
          defaultPage={1}
          count={Math.ceil((data?.meta?.count ?? 1) / pagination.limit)}
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

export default ThemeDataGrid;
