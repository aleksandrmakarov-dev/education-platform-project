import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

interface DictionaryFormProps {
  register: UseFormRegister<DictionaryFormSchemaType>;
  errors: FieldErrors<DictionaryFormSchemaType>;
}

const DictionaryForm: React.FC<DictionaryFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="py-1.5 w-[512px] flex flex-col gap-5">
      <TextField
        label="Title"
        size="small"
        fullWidth
        required
        {...register("title")}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />
    </div>
  );
};

export default DictionaryForm;