import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWordDialog from "../../dialogs/word/CreateWordDialog";
import WordDataGridBody from "./WordDataGridBody";
import WordDataGridLoading from "./WordDataGridLoading";
import WordDataGridEmpty from "./WordDataGridEmpty";
import useGetWordListByThemeId from "../../../hooks/theme/useGetWordListByThemeId";
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";

interface WordDataGridProps {
  themeId: string;
  themeSlug?: string;
}

const WordDataGrid: React.FC<WordDataGridProps> = ({ themeId, themeSlug }) => {
  const { data, isLoading, isError, isRefetching } = useGetWordListByThemeId({
    themeId: themeId,
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-10 items-center justify-between">
        <div>
          <Button
            className="!bg-blue-50"
            href={`/practice/${themeSlug}/learn`}
            variant="outlined"
          >
            Learn
          </Button>
        </div>
        <ProtectionWrapper roles={["admin"]}>
          {" "}
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
        </ProtectionWrapper>
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
