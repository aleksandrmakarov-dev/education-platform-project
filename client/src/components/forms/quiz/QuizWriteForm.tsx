import React from "react";
import { Control, Controller } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import { FormControl, FormLabel, TextField } from "@mui/material";

interface QuizWriteFormProps {
  control: Control<QuizFormSchemaType>;
  disabled?: boolean;
}

const QuizWriteForm: React.FC<QuizWriteFormProps> = ({ control, disabled }) => {
  return (
    <Controller
      name="givenAnswer"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={error !== undefined} className="w-full">
          <FormLabel>Write your answer:</FormLabel>
          <TextField
            {...field}
            size="small"
            fullWidth
            required
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  );
};

export default QuizWriteForm;
