import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import WordDataGrid from "../components/views/word/WordDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import { queryNames } from "../lib/constants";
import ThemesService from "../services/themes.service";
import Header from "../components/shared/ui/header/Header";

const WordsPage = () => {
  const { themeSlug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryNames.theme.bySlug, themeSlug],
    queryFn: async () => {
      if (!themeSlug) {
        return undefined;
      }
      return await ThemesService.getBySlug(themeSlug);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-5 flex flex-col gap-1">
      <BreadcrumbsComponent />
      <Header
        isBusy={isLoading}
        title={data?.title}
        subtitle={data?.description}
      />
      {data && <WordDataGrid themeId={data.id} />}
    </div>
  );
};

export default WordsPage;
