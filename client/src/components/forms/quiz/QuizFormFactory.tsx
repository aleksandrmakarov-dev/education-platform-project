import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import { QuizQuestionType } from "../../cards/quiz/QuizCard";
import QuizTrueFalsseForm from "./QuizTrueFalseForm";
import QuizMultipleChoiceForm from "./QuizMultipleChoiceForm";
import QuizWriteForm from "./QuizWriteForm";

interface QuizFormFactoryProps {
  register: UseFormRegister<QuizFormSchemaType>;
  errors: FieldErrors<QuizFormSchemaType>;
  options: any;
  disabled?: boolean;
  type: QuizQuestionType;
}

const QuizFormFactory: React.FC<QuizFormFactoryProps> = ({
  type,
  ...props
}) => {
  switch (type) {
    case "true-false":
      return <QuizTrueFalsseForm {...props} />;
    case "multiple-choice":
      return <QuizMultipleChoiceForm {...props} />;
    case "write":
      return <QuizWriteForm {...props} />;
    default:
      return null;
  }
};

export default QuizFormFactory;
