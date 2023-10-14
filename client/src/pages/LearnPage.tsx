import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";
import QuizCard from "../components/cards/quiz/QuizCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../lib/constants";
import ThemesService from "../services/themes.service";
import { shuffle } from "../lib/utils";

export default function LearnPage() {
  const { themeId } = useParams();

  const { data, isLoading, isError, isRefetching } = useQuery(
    [queryNames.word.list],
    async () => {
      if (!themeId) {
        return undefined;
      }
      return await ThemesService.getWordsByThemeId({ identifier: themeId });
    }
  );

  if (isLoading || isRefetching) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  return (
    <div className="p-5 flex flex-col gap-2 h-full">
      <BreadcrumbsComponent />
      <Header title="Learn" subtitle="Learn themes with quiz questions" />
      <div className="flex items-center justify-center h-full">
        <div className="max-w-screen-md w-full h-full">
          <QuizCard
            words={shuffle(data.items)}
            questionTypes={["true-false", "multiple-choice", "write"]}
          />
        </div>
      </div>
    </div>
  );
}
