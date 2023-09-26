import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ThemeCreateFormDialog from "../../dialogs/theme-dialogs/ThemeCreateFormDialog";

interface ThemeListEmptyCreateProps {
  dictionaryId: string;
}

const ThemeListEmptyCreate: React.FC<ThemeListEmptyCreateProps> = ({
  dictionaryId,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <FindInPageIcon
        className="text-gray-400"
        style={{ width: "5rem", height: "5rem" }}
      />
      <p className="text-gray-800 font-semibold">
        You'll find your themes here
      </p>
      <ThemeCreateFormDialog
        trigger={
          <Button variant="outlined" startIcon={<AddIcon />}>
            Create theme
          </Button>
        }
        redirectOnSuccess
        dictionaryId={dictionaryId}
      />
    </div>
  );
};

export default ThemeListEmptyCreate;
