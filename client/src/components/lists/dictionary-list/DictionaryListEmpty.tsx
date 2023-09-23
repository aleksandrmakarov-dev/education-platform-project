import { DocumentMultipleFilled } from "@fluentui/react-icons";

const DictionaryListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <DocumentMultipleFilled className="h-16 w-16 text-gray-300" />
      <p className="text-gray-800 font-semibold">
        You'll find your dictionaries here
      </p>
    </div>
  );
};

export default DictionaryListEmpty;
