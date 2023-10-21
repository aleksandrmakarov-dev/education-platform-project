import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateWordDialog from "../../dialogs/word/CreateWordDialog";
import WordDataGridBody from "./WordDataGridBody";
import WordDataGridLoading from "./WordDataGridLoading";
import WordDataGridEmpty from "./WordDataGridEmpty";
import useGetWordListByThemeId from "../../../hooks/theme/useGetWordListByThemeId";
import ProtectionWrapper from "../../shared/ui/ProtectionWrapper";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

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
      <div className="flex gap-x-10 gap-y-2 items-center justify-between flex-wrap">
        {(data?.meta?.count ?? 0) >= 4 && (
          <Button
            className="!bg-blue-50 w-full sm:w-auto"
            startIcon={<SchoolRoundedIcon />}
            href={`${themeSlug}/learn`}
            variant="outlined"
            disableElevation
          >
            Learn
          </Button>
        )}
        <ProtectionWrapper roles={["admin"]}>
          <CreateWordDialog
            theme={themeId}
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
