import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ThemeFormSchemaType } from "../../../lib/validations/theme-form.schema";
import FileUpload, { FileData } from "../../shared/file-upload/FileUpload";

interface ThemeFormProps {
  register: UseFormRegister<ThemeFormSchemaType>;
  errors: FieldErrors<ThemeFormSchemaType>;
  setValue: UseFormSetValue<ThemeFormSchemaType>;
}

const ThemeForm: React.FC<ThemeFormProps> = ({
  register,
  errors,
  setValue,
}) => {
  const onFileUploadCallback = (files: FileData[]) => {
    if (files.length === 0) {
      setValue("image", undefined);
    } else {
      setValue("image", files[0].url);
    }
  };

  return (
    <div className="py-1.5 w-[512px] flex flex-col gap-5">
      <TextField sx={{ display: "none" }} {...register("image")} />
      <FileUpload onCallback={onFileUploadCallback} path="/themes/previews" />
      <TextField
        label="Title"
        size="small"
        fullWidth
        required
        {...register("title")}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />
      <TextField
        label="Description"
        size="small"
        fullWidth
        required
        {...register("description")}
        error={errors.description !== undefined}
        helperText={errors.description?.message}
        multiline
        rows={2}
      />
    </div>
  );
};

export default ThemeForm;
