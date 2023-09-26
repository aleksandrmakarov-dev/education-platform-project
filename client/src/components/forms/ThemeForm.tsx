import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ThemeFormSchemaType } from "../../lib/validations/theme-form.schema";
import { TextField } from "@mui/material";

interface ThemeFormProps {
  register: UseFormRegister<ThemeFormSchemaType>;
  errors: FieldErrors<ThemeFormSchemaType>;
}

const ThemeForm: React.FC<ThemeFormProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-4 pt-2 w-96">
      <TextField
        label="Title"
        required
        fullWidth
        size="small"
        {...register("title")}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />
      <TextField
        label="Description"
        required
        multiline
        fullWidth
        size="small"
        maxRows={4}
        {...register("description")}
        error={errors.description !== undefined}
        helperText={errors.description?.message}
      />
    </div>
  );
};

export default ThemeForm;
