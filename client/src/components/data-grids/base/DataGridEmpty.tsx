import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface DataGridEmptyProps {
  title?: string;
  subtitle?: string;
  icon?: JSX.Element;
}

const DataGridEmpty: React.FC<DataGridEmptyProps> = ({
  title,
  subtitle,
  icon,
}) => (
  <div className="flex flex-col gap-0.5 items-center justify-center py-10 text-center">
    {icon ?? <SearchRoundedIcon sx={{ fontSize: 64 }} />}
    <h5 className="text-lg">{title ?? "No items was found."}</h5>
    <p className="text-gray-600 max-w-xs ">
      {subtitle ?? "Oops! Seems like there's nothing in database yet"}
    </p>
  </div>
);

export default DataGridEmpty;
