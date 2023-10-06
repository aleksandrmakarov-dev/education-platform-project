import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWordDialog from "../../dialogs/word/CreateWordDialog";
import { useQuery } from "@tanstack/react-query";
import WordDataGridBody from "./WordDataGridBody";
import WordDataGridLoading from "./WordDataGridLoading";
import WordDataGridEmpty from "./WordDataGridEmpty";
import ThemesService from "../../../services/themes.service";

interface WordDataGridProps {
  themeId: string;
}

const WordDataGrid: React.FC<WordDataGridProps> = ({ themeId }) => {
  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ["words"],
    queryFn: async () => {
      return await ThemesService.getWordsByThemeId({
        identifier: themeId,
      });
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full">
      <div className="mb-2">
        <div className="flex gap-10 items-center justify-end">
          <CreateWordDialog
            theme={themeId}
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
      <WordDataGridBody
        data={data?.items}
        isLoading={isLoading || isRefetching}
        isError={isError}
        loadingView={<WordDataGridLoading />}
        emptyView={<WordDataGridEmpty />}
      />
    </div>
  );
};

export default WordDataGrid;
