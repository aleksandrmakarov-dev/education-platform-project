import React from "react";
import { TextField } from "@mui/material";
import FileUpload from "../../shared/file-upload/FileUpload";
import { WordFormSchemaType } from "../../../lib/validations/word-form.schema";
import { Control, Controller } from "react-hook-form";

interface WordFormProps {
  control: Control<WordFormSchemaType>;
}

const WordForm: React.FC<WordFormProps> = ({ control }) => {
  return (
    <div className="py-1.5 w-[512px] flex flex-col gap-5">
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <FileUpload
            onCallback={(f) => {
              if (f && f.length > 0) {
                field.onChange(f[0].url);
              } else {
                field.onChange("");
              }
            }}
            path={`/themes/${control._formValues.themeId}`}
          />
        )}
      />
      <Controller
        name="text"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Text"
            size="small"
            fullWidth
            required
            error={error !== undefined}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="definition"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Definition"
            size="small"
            fullWidth
            required
            error={error !== undefined}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="textContext"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Text context"
            size="small"
            fullWidth
            error={error !== undefined}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="definitionContext"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Definition context"
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

export default WordForm;
