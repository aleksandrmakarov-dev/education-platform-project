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
        label="Translation"
        size="small"
        fullWidth
        required
        {...register("translation")}
        error={errors.translation !== undefined}
        helperText={errors.translation?.message}
      />
      <TextField
        label="Context"
        size="small"
        fullWidth
        {...register("context")}
        error={errors.context !== undefined}
        helperText={errors.context?.message}
      />
      <TextField
        label="Context translation"
        size="small"
        fullWidth
        {...register("contextTranslation")}
        error={errors.contextTranslation !== undefined}
        helperText={errors.contextTranslation?.message}
      />
    </div>
  );
};

export default WordForm;
