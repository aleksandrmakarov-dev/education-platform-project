import DictionaryCardSkeleton from "../../cards/dictionary/DictionaryCardSkeleton";

interface DictionaryDataGridLoadingProps {
  count: number;
}

const DictionaryDataGridLoading: React.FC<DictionaryDataGridLoadingProps> = ({
  count,
}) => (
  <div className="grid grid-cols-3 gap-5">
    {[...Array(count).keys()].map((item) => (
      <DictionaryCardSkeleton key={item} />
    ))}
  </div>
);

export default DictionaryDataGridLoading;
