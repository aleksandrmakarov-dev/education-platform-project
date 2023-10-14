import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface QuizMultipleChoiceFormProps {
  register: UseFormRegister<QuizFormSchemaType>;
  errors: FieldErrors<QuizFormSchemaType>;
  options: string[];
  disabled?: boolean;
}

const QuizMultipleChoiceForm: React.FC<QuizMultipleChoiceFormProps> = ({
  options,
  register,
  errors,
  disabled,
}) => {
  return (
    <FormControl error={errors.givenAnswer !== undefined} className="w-full">
      <FormLabel>Choose correct answer:</FormLabel>
      <RadioGroup>
        <div className="grid grid-cols-2 gap-1">
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              label={option}
              control={
                <Radio {...register("givenAnswer")} disabled={disabled} />
              }
            />
          ))}
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default QuizMultipleChoiceForm;
