import { CircularProgress } from "@mui/material";

const DictionaryDataGridLoading = () => {
  return (
    <div className="flex flex-col gap-0.5 items-center justify-center py-10">
      <CircularProgress />
      <h5 className="text-lg">Loading data...</h5>
    </div>
  );
};

export default DictionaryDataGridLoading;
