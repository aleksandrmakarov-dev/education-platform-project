import { Button } from "@fluentui/react-components";
import { Add12Filled, DocumentMultipleFilled } from "@fluentui/react-icons";

const ThemeListEmptyCreate = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <DocumentMultipleFilled className="h-16 w-16 text-gray-300" />
      <p className="text-gray-800 font-semibold">
        You'll find your themes here
      </p>
      <Button icon={<Add12Filled />}>Create Theme</Button>
    </div>
  );
};

export default ThemeListEmptyCreate;
