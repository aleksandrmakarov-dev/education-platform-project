import ThemeDataGrid from "../components/views/theme/ThemeDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import { redirect, useParams } from "react-router-dom";
import Header from "../components/shared/ui/header/Header";
import useGetDictionaryBySlug from "../hooks/dictionary/useGetDictionaryBySlug";

export default function ThemesPage() {
  const { dictionarySlug } = useParams();

  const { data, isLoading, isRefetching } = useGetDictionaryBySlug({
    dictionarySlug,
  });

  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbsComponent />
      <Header
        isBusy={isLoading || isRefetching}
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
