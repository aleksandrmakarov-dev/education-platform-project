import ThemeCardSkeleton from "../../cards/theme/ThemeCardSkeleton";

interface ThemeDataGridLoadingProps {
  count: number;
}

const ThemeDataGridLoading: React.FC<ThemeDataGridLoadingProps> = ({
  count,
}) => (
  <div className="grid grid-cols-3 gap-5">
    {[...Array(count).keys()].map((item) => (
      <ThemeCardSkeleton key={item} />
    ))}
  </div>
);

export default ThemeDataGridLoading;
