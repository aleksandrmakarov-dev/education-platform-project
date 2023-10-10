import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchValidationSchema,
  SearchValidationSchemaType,
} from "../../lib/validations/utils.schema";
import { Search } from "../../hooks/shared/useSearch";

interface DataGridSearchFormProps {
  search?: Search;
  setSearch: (value: Search) => void;
  resetSearch: () => void;
}

const DataGridSearchForm: React.FC<DataGridSearchFormProps> = ({
  search,
  setSearch,
  resetSearch,
}) => {
  const { register, reset, handleSubmit } = useForm<SearchValidationSchemaType>(
    {
      resolver: zodResolver(SearchValidationSchema),
      defaultValues: { ...search },
      values: { ...search },
    }
  );

  const onSubmit = (values: SearchValidationSchemaType) => {
    setSearch({ ...search, searchQuery: values.searchQuery });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-1 items-center">
        <TextField
          size="small"
          variant="standard"
          hiddenLabel
          margin="dense"
          placeholder="Search"
          {...register("searchQuery")}
        />
        <IconButton size="small" type="submit">
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default DataGridSearchForm;
