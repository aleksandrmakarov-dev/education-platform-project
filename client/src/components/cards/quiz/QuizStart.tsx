import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { QuizQuestionType } from "./QuizCard";

interface QuizStartProps {
  questionTypes: { label: string; value: QuizQuestionType; checked: boolean }[];
  onSubmitCallback: (values: QuizQuestionType[]) => void;
}

const QuizStart: React.FC<QuizStartProps> = ({
  questionTypes,
  onSubmitCallback,
}) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const selectedCheckboxes = Object.keys(data).filter(
      (key) => data[key] === true
    );
    if (selectedCheckboxes.length === 0) {
      return;
    }
    onSubmitCallback(selectedCheckboxes as QuizQuestionType[]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormGroup>
        <FormLabel>Choose question types</FormLabel>
        {questionTypes.map((questionType) => (
          <Controller
            key={questionType.value}
            name={questionType.value}
            control={control}
            defaultValue={questionType.checked}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={questionType.label}
              />
            )}
          />
        ))}
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
      >
        Start quiz
      </Button>
    </form>
  );
};

export default QuizStart;
