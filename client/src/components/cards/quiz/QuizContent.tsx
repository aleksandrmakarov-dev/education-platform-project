import React from "react";
import QuizAnswerReveal from "./QuizAnswerReveal";
import QuizCardBody from "./QuizCardBody";
import { QuizCardState, QuizQuestionType } from "./QuizCard";
import { Control } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import QuizFormFactory from "../../forms/quiz/QuizFormFactory";

interface QuizContentProps {
  question: string;
  image?: string;
  answer: string;
  state: QuizCardState;
  additionalProps?: any;
  type: QuizQuestionType;
  control: Control<QuizFormSchemaType>;
}

const QuizContent: React.FC<QuizContentProps> = ({
  question,
  image,
  answer,
  state,
  additionalProps,
  type,
  control,
}) => {
  return (
    <div className="flex flex-col gap-5 flex-1">
      <QuizCardBody
        question={question}
        image={image}
        answer={
          type === "true-false" ? additionalProps.options.trueValue : answer
        }
        answerLabel={type === "true-false" ? "Term: " : "Defimition: "}
        questionLabel="Definition: "
        showAnswer={type === "true-false"}
      />
      <QuizAnswerReveal
        state={state}
        answer={answer}
        correctLabel="Congratulations! Your answer is correct"
        wrongLabel="Sorry, your answer is wrong"
      />
      <QuizFormFactory
        type={type}
        control={control}
        {...additionalProps}
        disabled={state !== "idle"}
      />
    </div>
  );
};

export default QuizContent;
