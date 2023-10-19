import DictionaryDataGrid from "../components/views/dictionary/DictionaryDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";

export default function DictionariesPage() {
  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbsComponent />
      <Header
        title="Dictionaries"
        subtitle="Choose dictionary the you are interested in"
      />
      <DictionaryDataGrid />
    </div>
  );
}
