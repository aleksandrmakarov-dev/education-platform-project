import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DictionaryDeleteFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

interface DictionaryDeleteFormProps {
  register: UseFormRegister<DictionaryDeleteFormSchemaType>;
  errors: FieldErrors<DictionaryDeleteFormSchemaType>;
}

const DictionaryDeleteForm: React.FC<DictionaryDeleteFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="py-1.5 w-full">
      <TextField
        size="small"
        fullWidth
        {...register("input")}
        error={errors.input !== undefined}
        helperText={errors.input?.message}
      />
    </div>
  );
};

export default DictionaryDeleteForm;
