import { Typography, Button } from "@mui/material";
import CreateDictionaryDialog from "../../dialogs/dictionary/CreateDictionaryDialog";
import AddIcon from "@mui/icons-material/Add";

const TermDataGrid = () => {
  return (
    <div className="w-full">
      <div className="mb-2">
        <Typography variant="h5" className="mb-2">
          Terms
        </Typography>
        <div className="flex gap-10 items-center justify-end">
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
    </div>
  );
};

export default TermDataGrid;
