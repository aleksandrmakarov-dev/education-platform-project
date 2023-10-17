import React from "react";
import { TextField } from "@mui/material";
import FileUpload from "../../shared/file-upload/FileUpload";
import { WordFormSchemaType } from "../../../lib/validations/word-form.schema";
import { Control, Controller } from "react-hook-form";
import useLanguage from "../../../hooks/shared/useLanguage";
import AudioToolbar from "../../shared/ui/AudioToolbar";

interface WordFormProps {
  control: Control<WordFormSchemaType>;
}

const WordForm: React.FC<WordFormProps> = ({ control }) => {
  const { languageCodeFrom, languageCodeTo } = useLanguage();

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
            path={`/themes/${control._formValues.theme}/images`}
          />
        )}
      />
      <Controller
        name="text"
        control={control}
        render={({ field: textField, fieldState: { error } }) => (
          <div className="flex gap-1 items-center">
            <TextField
              {...textField}
              label="Text"
              size="small"
              fullWidth
              required
              error={error !== undefined}
              helperText={error?.message}
            />
            <Controller
              name="textAudioUrl"
              control={control}
              render={({ field: textAudioUrlField }) => (
                <AudioToolbar
                  lang={languageCodeFrom}
                  text={textField.value}
                  url={textAudioUrlField.value}
                  onAudioGenerated={(url) => textAudioUrlField.onChange(url)}
                  path={`/themes/${control._formValues.theme}/sounds`}
                />
              )}
            />
          </div>
        )}
      />
      <Controller
        name="definition"
        control={control}
        render={({ field: definitionField, fieldState: { error } }) => (
          <div className="flex gap-1 items-center">
            <TextField
              {...definitionField}
              label="Definition"
              size="small"
              fullWidth
              required
              error={error !== undefined}
              helperText={error?.message}
            />
            <Controller
              name="definitionAudioUrl"
              control={control}
              render={({ field: definitionAudioUrlField }) => (
                <AudioToolbar
                  lang={languageCodeTo}
                  text={definitionField.value}
                  url={definitionAudioUrlField.value}
                  onAudioGenerated={(url) =>
                    definitionAudioUrlField.onChange(url)
                  }
                  path={`/themes/${control._formValues.theme}/sounds`}
                />
              )}
            />
          </div>
        )}
      />
    </div>
  );
};

export default WordForm;
