import React from "react";
import { Control, Controller } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PlaySoundButton from "../../shared/ui/PlaySoundButton";

interface QuizMultipleChoiceFormProps {
  control: Control<QuizFormSchemaType>;
  options: { value: string; audioUrl: string }[];
  disabled?: boolean;
}

const QuizMultipleChoiceForm: React.FC<QuizMultipleChoiceFormProps> = ({
  options,
  control,
  disabled,
}) => {
  return (
    <Controller
      name="givenAnswer"
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <FormControl error={error !== undefined} className="w-full">
          <FormLabel>Choose correct answer:</FormLabel>
          <RadioGroup>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1">
              {options.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <FormControlLabel
                    value={option.value}
                    label={option.value}
                    control={<Radio {...field} disabled={disabled} />}
                  />
                  <PlaySoundButton size="small" url={option.audioUrl} />
                </div>
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default QuizMultipleChoiceForm;
