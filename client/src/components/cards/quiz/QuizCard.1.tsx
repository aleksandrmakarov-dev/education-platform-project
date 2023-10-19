import { Card, CardContent, CardActions, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Word } from "../../../lib/types";
import { shuffle } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QuizFormSchema, {
  QuizFormSchemaType,
} from "../../../lib/validations/quiz-form.schema";
import QuizContent from "./QuizContent";
import QuizResult from "./QuizResult";
import QuizActions from "./QuizActions";
import SwipeAnimation from "../../shared/animations/SwipeAnimation";
import QuizStart from "./QuizStart";
import {
  QuizCardProps,
  QuizCardState,
  Answer,
  Question,
  OptionType,
} from "./QuizCard";

export const QuizCard: React.FC<QuizCardProps> = ({ words, questionTypes }) => {
  const [state, setState] = useState<QuizCardState>("start");
  const [shuffledWords, setShuffledWords] = useState<Word[]>(shuffle(words));
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [activeItem, setActiveItem] = useState<Question>();

  const { control, handleSubmit, reset } = useForm<QuizFormSchemaType>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      givenAnswer: "",
    },
  });

  useEffect(() => {
    setShuffledWords(shuffle(words));
  }, [words]);

  useEffect(() => {
    if (!shuffledWords || activeIndex === undefined) {
      return;
    }

    const word = shuffledWords[activeIndex];

    const rnd = Math.round(Math.random() * (questionTypes.length - 1));
    const questionType = questionTypes[rnd];

    let props = {};

    if (questionType === "multiple-choice") {
      const mappedWords: OptionType[] = shuffledWords.map((w) => ({
        value: w.text,
        audioUrl: w.textAudioUrl,
      }));
      const wrongOptions: OptionType[] = shuffle(
        mappedWords.filter((w) => w.value !== word.text)
      ).slice(0, 3);

      props = {
        options: shuffle([
          ...wrongOptions,
          { value: word.text, audioUrl: word.textAudioUrl },
        ]),
      };
    } else if (questionType === "true-false") {
      const rnd2 = Math.round(Math.random() * 1);
      const isTrue = rnd2 > 0;

      const randomItem = shuffle(
        shuffledWords.filter((w) => w.text !== word.text)
      )[0];
      const options: { trueValue: OptionType; falseValue: OptionType } = isTrue
        ? {
            trueValue: { value: word.text, audioUrl: word.textAudioUrl },
            falseValue: {
              value: randomItem.text,
              audioUrl: randomItem.textAudioUrl,
            },
          }
        : {
            trueValue: {
              value: randomItem.text,
              audioUrl: randomItem.textAudioUrl,
            },
            falseValue: { value: word.text, audioUrl: word.textAudioUrl },
          };

      props = {
        options: options,
      };
    }

    const newQuestion: Question = {
      question: word.definition,
      answer: word.text,
      image: word.image,
      type: questionType,
      questionAudioUrl: word.definitionAudioUrl,
      answerAudioUrl: word.textAudioUrl,
      additionalProps: props,
    };

    setActiveItem(newQuestion);
  }, [activeIndex, shuffledWords]);

  useEffect(() => {
    if (state === "idle") {
      reset();
    }
  }, [state]);

  const appendQuestionToAnswers = (
    question: Question,
    givenAnswer: string,
    correct: boolean
  ) => {
    setAnswers((prev) => [...prev, { ...question, givenAnswer, correct }]);
  };

  const onSubmit = (values: QuizFormSchemaType) => {
    if (!activeItem) {
      return;
    }
    const isAnswerCorrect =
      values.givenAnswer.toLowerCase() === activeItem?.answer.toLowerCase();
    setState(isAnswerCorrect ? "correct" : "wrong");
    appendQuestionToAnswers(activeItem, values.givenAnswer, isAnswerCorrect);
  };

  const onNextClick = () => {
    if (activeIndex === undefined) {
      return;
    }

    if (activeIndex === words.length - 1) {
      setState("finished");
      return;
    }

    setActiveIndex(activeIndex + 1);
    setState("idle");
  };

  const onSkipClick = () => {
    if (!activeItem) {
      return;
    }

    setState("skipped");
    appendQuestionToAnswers(activeItem, "", false);
  };

  const onTryAgainClick = () => {
    setState("start");
  };

  const onStartClick = () => {
    setShuffledWords(shuffle(words));
    setAnswers([]);
    setActiveIndex(0);
    setState("idle");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
      className="h-full flex flex-col"
    >
      {state === "start" ? (
        <QuizStart onStart={onStartClick} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1"
        >
          <CardHeader
            title={`Question ${(activeIndex ?? 0) + 1} of ${words.length}`}
          />
          <CardContent className="border-y border-gray-200 flex-1 flex flex-col">
            {activeItem && state !== "finished" && (
              <SwipeAnimation direction={"left"} index={activeIndex ?? 0}>
                <QuizContent
                  state={state}
                  question={activeItem}
                  control={control}
                />
              </SwipeAnimation>
            )}
            {state === "finished" && <QuizResult answers={answers} />}
          </CardContent>
          <CardActions className="flex gap-2 justify-end">
            <QuizActions
              isLastQuestion={activeIndex === words.length - 1}
              state={state}
              onNextClick={onNextClick}
              onSkipClick={onSkipClick}
              onTryAgainClick={onTryAgainClick}
            />
          </CardActions>
        </form>
      )}
    </Card>
  );
};
