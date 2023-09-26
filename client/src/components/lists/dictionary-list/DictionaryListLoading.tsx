import { CircularProgress } from "@mui/material";

const DictionaryListLoading = () => {
  return (
    <div className="flex flex-col gap-3 py-10">
      <CircularProgress />
      <p className="text-center text-lg text-gray-800">Loading...</p>
    </div>
  );
};

export default DictionaryListLoading;
