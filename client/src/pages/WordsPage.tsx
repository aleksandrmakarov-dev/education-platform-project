import { useParams } from "react-router-dom";
import WordDataGrid from "../components/views/word/WordDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";
import useGetThemeBySlug from "../hooks/theme/useGetThemeBySlug";

const WordsPage = () => {
  const { themeSlug } = useParams();

  const { data, isLoading } = useGetThemeBySlug({ themeSlug });

  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbsComponent />
      <Header
        isBusy={isLoading}
        title={data?.title}
        subtitle={data?.description}
      />
      {data && <WordDataGrid themeId={data.id} themeSlug={themeSlug} />}
    </div>
  );
};

export default WordsPage;
