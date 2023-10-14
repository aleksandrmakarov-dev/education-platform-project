import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import { FormControl, FormLabel, TextField } from "@mui/material";

interface QuizWriteFormProps {
  register: UseFormRegister<QuizFormSchemaType>;
  errors: FieldErrors<QuizFormSchemaType>;
  disabled?: boolean;
}

const QuizWriteForm: React.FC<QuizWriteFormProps> = ({
  register,
  errors,
  disabled,
}) => {
  return (
    <FormControl error={errors.givenAnswer !== undefined} className="w-full">
      <FormLabel>Write your answer:</FormLabel>
      <TextField
        size="small"
        fullWidth
        required
        {...register("givenAnswer")}
        disabled={disabled}
      />
    </FormControl>
  );
};

export default QuizWriteForm;
