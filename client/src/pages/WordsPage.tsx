import { useParams } from "react-router-dom";
import WordDataGrid from "../components/views/word/WordDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";
import useGetThemeBySlug from "../hooks/theme/useGetThemeBySlug";
import { LanguageProvider } from "../hooks/shared/useLanguage";

const WordsPage = () => {
  const { themeSlug } = useParams();

  const { data, isLoading } = useGetThemeBySlug({ themeSlug });

  return (
    <div className="p-5 flex flex-col gap-3">
      <BreadcrumbsComponent />
      <Header
        isBusy={isLoading}
        title={data?.title}
        subtitle={data?.description}
      />
      {data && (
        <LanguageProvider
          languageCodeFrom={data.languageFrom}
          languageCodeTo={data.languageTo}
        >
          <WordDataGrid themeId={data.id} themeSlug={themeSlug} />
        </LanguageProvider>
      )}
    </div>
  );
};

export default WordsPage;
