import ThemeCardSkeleton from "../../cards/theme/ThemeCardSkeleton";

interface ThemeDataGridLoadingProps {
  count: number;
}

const ThemeDataGridLoading: React.FC<ThemeDataGridLoadingProps> = ({
  count,
}) => (
  <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5 h-full items-start">
    {[...Array(count).keys()].map((item) => (
      <ThemeCardSkeleton key={item} />
    ))}
  </div>
);

export default ThemeDataGridLoading;
