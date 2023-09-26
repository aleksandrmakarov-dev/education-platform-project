import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DictionaryFormSchemaType } from "../../lib/validations/dictionary-form.schema";
import { TextField } from "@mui/material";

interface DictionaryFormProps {
  register: UseFormRegister<DictionaryFormSchemaType>;
  errors: FieldErrors<DictionaryFormSchemaType>;
}

const DictionaryForm: React.FC<DictionaryFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-1 pt-2 w-96">
      <TextField
        fullWidth
        size="small"
        label="Title"
        required
        {...register("title")}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />
    </div>
  );
};

export default DictionaryForm;
