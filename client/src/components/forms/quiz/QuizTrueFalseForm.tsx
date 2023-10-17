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
import { OptionType } from "../../cards/quiz/QuizCard";

interface QuizTrueFalsseFormProps {
  control: Control<QuizFormSchemaType>;
  options: {
    trueValue: OptionType;
    falseValue: OptionType;
  };
  disabled?: boolean;
}

const QuizTrueFalsseForm: React.FC<QuizTrueFalsseFormProps> = ({
  control,
  disabled,
  options,
}) => {
  return (
    <Controller
      name="givenAnswer"
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <FormControl error={error !== undefined} className="w-full">
          <FormLabel>Choose true or false:</FormLabel>
          <RadioGroup>
            <div className="grid grid-cols-2 gap-1">
              <FormControlLabel
                value={options.trueValue.value}
                label="True"
                control={<Radio {...field} disabled={disabled} />}
              />
              <FormControlLabel
                value={options.falseValue.value}
                label="False"
                control={<Radio {...field} disabled={disabled} />}
              />
            </div>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default QuizTrueFalsseForm;
