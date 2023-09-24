import { Spinner } from "@fluentui/react-components";

const DictionaryListLoading = () => {
  return (
    <div className="flex flex-col gap-3 py-10">
      <Spinner appearance="primary" size="huge" />
      <p className="text-center text-lg text-gray-800">Loading...</p>
    </div>
  );
};

export default DictionaryListLoading;
