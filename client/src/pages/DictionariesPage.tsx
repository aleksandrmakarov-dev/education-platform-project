import DictionaryDataGrid from "../components/views/dictionary/DictionaryDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";

export default function DictionariesPage() {
  return (
    <div className="p-5 flex flex-col gap-1 h-full">
      <BreadcrumbsComponent />
      <Header
        title="Dictionaries"
        subtitle="Choose dictionary the you are interested in"
      />
      <DictionaryDataGrid />
    </div>
  );
}
