import DictionaryCardSkeleton from "../../cards/dictionary/DictionaryCardSkeleton";

interface DictionaryDataGridLoadingProps {
  count: number;
}

const DictionaryDataGridLoading: React.FC<DictionaryDataGridLoadingProps> = ({
  count,
}) => (
  <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5 h-full items-start">
    {[...Array(count).keys()].map((item) => (
      <DictionaryCardSkeleton key={item} />
    ))}
  </div>
);

export default DictionaryDataGridLoading;
