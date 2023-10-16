import { MenuItem, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ThemeFormSchemaType } from "../../../lib/validations/theme-form.schema";
import FileUpload from "../../shared/file-upload/FileUpload";
import { languagesAndCodes } from "../../../lib/constants";

interface ThemeFormProps {
  control: Control<ThemeFormSchemaType>;
}

const ThemeForm: React.FC<ThemeFormProps> = ({ control }) => {
  return (
    <div className="py-1.5 w-[512px] flex flex-col gap-5">
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange } }) => (
          <FileUpload
            onCallback={(f) => {
              if (f && f.length > 0) {
                onChange(f[0].url);
              } else {
                onChange("");
              }
            }}
            path="/themes/previews"
          />
        )}
      />
      <Controller
        name="title"
        control={control}
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
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Description"
            size="small"
            fullWidth
            required
            error={error !== undefined}
            helperText={error?.message}
            multiline
            rows={2}
          />
        )}
      />
      <Controller
        name="languageFrom"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            label="Choose language from"
            size="small"
            error={error !== undefined}
            helperText={error?.message}
          >
            {languagesAndCodes.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="languageTo" // Replace with your field name
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            label="Choose language to"
            size="small"
            error={error !== undefined}
            helperText={error?.message}
          >
            {languagesAndCodes.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </div>
  );
};

export default ThemeForm;
