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

interface QuizTrueFalsseFormProps {
  register: UseFormRegister<QuizFormSchemaType>;
  errors: FieldErrors<QuizFormSchemaType>;
  options: {
    trueValue: string;
    falseValue: string;
  };
  disabled?: boolean;
}

const QuizTrueFalsseForm: React.FC<QuizTrueFalsseFormProps> = ({
  register,
  errors,
  disabled,
  options,
}) => {
  return (
    <FormControl error={errors.givenAnswer !== undefined} className="w-full">
      <FormLabel>Choose true or false:</FormLabel>
      <RadioGroup>
        <div className="grid grid-cols-2 gap-1">
          <FormControlLabel
            value={options.trueValue}
            label="True"
            control={<Radio {...register("givenAnswer")} disabled={disabled} />}
          />
          <FormControlLabel
            value={options.falseValue}
            label="False"
            control={<Radio {...register("givenAnswer")} disabled={disabled} />}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default QuizTrueFalsseForm;
