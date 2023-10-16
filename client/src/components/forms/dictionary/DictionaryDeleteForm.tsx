import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DictionaryDeleteFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

interface DictionaryDeleteFormProps {
  control: Control<DictionaryDeleteFormSchemaType>;
}

const DictionaryDeleteForm: React.FC<DictionaryDeleteFormProps> = ({
  control,
}) => {
  return (
    <div className="py-1.5 w-full">
      <Controller
        control={control}
        name="input"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            size="small"
            fullWidth
            error={error !== undefined}
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
};

export default DictionaryDeleteForm;
