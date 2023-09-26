import FindInPageIcon from "@mui/icons-material/FindInPage";

const DictionaryListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <FindInPageIcon
        sx={{ width: "4rem", height: "4rem" }}
        className="text-gray-500"
      />
      <p className="text-gray-800 font-semibold">
        You'll find your dictionaries here
      </p>
    </div>
  );
};

export default DictionaryListEmpty;
