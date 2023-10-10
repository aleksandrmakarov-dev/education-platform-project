import ThemeDataGrid from "../components/views/theme/ThemeDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../lib/constants";
import DictionaryService from "../services/dictionaries.service";
import Header from "../components/shared/ui/header/Header";

export default function ThemesPage() {
  const { dictionarySlug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [queryNames.dictionary.bySlug, dictionarySlug],
    queryFn: async () => {
      if (!dictionarySlug) {
        return undefined;
      }
      return await DictionaryService.getBySlug(dictionarySlug);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-5 flex flex-col gap-1">
      <BreadcrumbsComponent />
      <Header
        isBusy={isLoading}
        title={data?.title}
        subtitle="Select theme and start your studies right now!"
      />
      {data && (
        <ThemeDataGrid
          dictionaryId={data.id}
          baseUrl={`/dictionaries/${data.slug}`}
        />
      )}
    </div>
  );
}
