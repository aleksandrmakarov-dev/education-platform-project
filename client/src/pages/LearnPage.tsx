import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";
import QuizCard from "../components/cards/quiz/QuizCard";
import { useNavigate, useParams } from "react-router-dom";
import useGetThemeBySlug from "../hooks/theme/useGetThemeBySlug";
import useGetWordListByThemeId from "../hooks/theme/useGetWordListByThemeId";

export default function LearnPage() {
  const { themeSlug } = useParams();
  const navigate = useNavigate();

  const { data: themeData, isLoading: themeIsLoading } = useGetThemeBySlug({
    themeSlug,
  });

  const { data, isLoading, isError, isRefetching } = useGetWordListByThemeId({
    themeId: themeData?.id,
  });

  if (isLoading || isRefetching) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  if ((data?.meta?.count ?? 0) < 4) {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      <BreadcrumbsComponent />
      <Header
        isBusy={themeIsLoading}
        title={`Practice "${themeData?.title}"`}
        subtitle="Learn themes with quiz questions"
      />
      <div className="flex items-center justify-center h-full">
        <div className="max-w-screen-md w-full h-full">
          <QuizCard
            words={data.items}
            questionTypes={["true-false", "multiple-choice", "write"]}
          />
        </div>
      </div>
    </div>
  );
}
