import { CircularProgress } from "@mui/material";

const ThemeListLoading = () => {
  return (
    <div className="flex flex-col gap-3 py-10 items-center">
      <CircularProgress />
      <p className="text-center text-lg text-gray-800">Loading...</p>
    </div>
  );
};

export default ThemeListLoading;
