import React from "react";
import { WordFormSchemaType } from "../../../lib/validations/word-form.schema";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { TextField } from "@mui/material";
import FileUpload, { FileData } from "../../shared/file-upload/FileUpload";

interface WordFormProps {
  register: UseFormRegister<WordFormSchemaType>;
  errors: FieldErrors<WordFormSchemaType>;
  setValue: UseFormSetValue<WordFormSchemaType>;
  getValues: UseFormGetValues<WordFormSchemaType>;
}

const WordForm: React.FC<WordFormProps> = ({
  register,
  errors,
  setValue,
  getValues,
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
      <FileUpload
        onCallback={onFileUploadCallback}
        path={`/themes/${getValues().theme}`}
      />
      <TextField
        label="Text"
        size="small"
        fullWidth
        required
        {...register("text")}
        error={errors.text !== undefined}
        helperText={errors.text?.message}
      />
      <TextField
        label="Definition"
        size="small"
        fullWidth
        required
        {...register("definition")}
        error={errors.definition !== undefined}
        helperText={errors.definition?.message}
      />
      <TextField
        label="Text context"
        size="small"
        fullWidth
        {...register("textContext")}
        error={errors.textContext !== undefined}
        helperText={errors.textContext?.message}
      />
      <TextField
        label="Definition context"
        size="small"
        fullWidth
        {...register("definitionContext")}
        error={errors.definitionContext !== undefined}
        helperText={errors.definitionContext?.message}
      />
    </div>
  );
};

export default WordForm;
