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

interface QuizMultipleChoiceFormProps {
  control: Control<QuizFormSchemaType>;
  options: string[];
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
            <div className="grid grid-cols-2 gap-1">
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  label={option}
                  control={<Radio {...field} disabled={disabled} />}
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default QuizMultipleChoiceForm;
