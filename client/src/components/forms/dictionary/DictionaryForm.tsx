import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";

interface DictionaryFormProps {
  control: Control<DictionaryFormSchemaType>;
}

const DictionaryForm: React.FC<DictionaryFormProps> = ({ control }) => {
  return (
    <div className="py-1.5 w-[512px] flex flex-col gap-5">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Title"
            size="small"
            fullWidth
            required
            error={error !== undefined}
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
};

export default DictionaryForm;
