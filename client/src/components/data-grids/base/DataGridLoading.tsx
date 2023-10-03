import { CircularProgress } from "@mui/material";

interface DataGridLoadingProps {
  title?: string;
  subtitle?: string;
}

const DataGridLoading: React.FC<DataGridLoadingProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-0.5 items-center justify-center py-10">
      <CircularProgress />
      <h5 className="text-lg">{title ?? "Loading data..."}</h5>
      {subtitle && <p className="text-gray-600 max-w-xs">{subtitle}</p>}
    </div>
  );
};

export default DataGridLoading;
