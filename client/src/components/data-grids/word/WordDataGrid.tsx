import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWordDialog from "../../dialogs/word/CreateWordDialog";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import WordDataGridBody from "./WordDataGridBody";
import WordDataGridLoading from "./WordDataGridLoading";
import WordDataGridEmpty from "./WordDataGridEmpty";
import ThemesService from "../../../services/themes.service";

const WordDataGrid = () => {
  const { themeId } = useParams();

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ["words"],
    queryFn: async () => {
      if (!themeId) {
        return undefined;
      }

      return await ThemesService.getWordsByThemeId({ id: themeId });
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full">
      <div className="mb-2">
        <Typography variant="h5" className="mb-2">
          Words
        </Typography>
        <div className="flex gap-10 items-center justify-end">
          <CreateWordDialog
            themeId={themeId ?? ""}
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
