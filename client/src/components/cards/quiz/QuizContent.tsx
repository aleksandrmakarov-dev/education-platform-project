import React from "react";
import QuizAnswerReveal from "./QuizAnswerReveal";
import QuizCardBody from "./QuizCardBody";
import { Question, QuizCardState, QuizQuestionType } from "./QuizCard";
import { Control } from "react-hook-form";
import { QuizFormSchemaType } from "../../../lib/validations/quiz-form.schema";
import QuizFormFactory from "../../forms/quiz/QuizFormFactory";

interface QuizContentProps {
  question: Question;
  state: QuizCardState;
  control: Control<QuizFormSchemaType>;
}

const QuizContent: React.FC<QuizContentProps> = ({
  question: {
    question,
    image,
    type,
    answer,
    additionalProps,
    questionAudioUrl,
    answerAudioUrl,
  },
  state,
  control,
}) => {
  return (
    <div className="flex flex-col gap-5 flex-1">
      <QuizCardBody
        question={question}
        image={image}
        answer={
          type === "true-false"
            ? additionalProps.options.trueValue.value
            : answer
        }
        answerLabel={type === "true-false" ? "Term: " : "Defimition: "}
        questionLabel="Definition: "
        showAnswer={type === "true-false"}
        answerAudioUrl={
          type === "true-false"
            ? additionalProps.options.trueValue.audioUrl
            : answerAudioUrl
        }
        questionAudioUrl={questionAudioUrl}
      />
      <QuizAnswerReveal
        state={state}
        answer={answer}
        correctLabel="Congratulations! Your answer is correct"
        wrongLabel="Sorry, your answer is wrong"
        answerAudioUrl={answerAudioUrl}
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
