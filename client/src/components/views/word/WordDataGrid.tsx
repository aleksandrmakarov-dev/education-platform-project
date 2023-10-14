import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWordDialog from "../../dialogs/word/CreateWordDialog";
import { useQuery } from "@tanstack/react-query";
import WordDataGridBody from "./WordDataGridBody";
import WordDataGridLoading from "./WordDataGridLoading";
import WordDataGridEmpty from "./WordDataGridEmpty";
import ThemesService from "../../../services/themes.service";
import { queryNames } from "../../../lib/constants";

interface WordDataGridProps {
  themeId: string;
}

const WordDataGrid: React.FC<WordDataGridProps> = ({ themeId }) => {
  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [queryNames.word.list],
    queryFn: async () => {
      return await ThemesService.getWordsByThemeId({
        identifier: themeId,
      });
    },
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-10 items-center justify-between">
        <div>
          <Button href={`/practice/${themeId}/learn`} variant="outlined">
            Learn
          </Button>
        </div>
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
