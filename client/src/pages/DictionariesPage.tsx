import DictionaryDataGrid from "../components/data-grids/dictionary/DictionaryDataGrid";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";

export default function DictionariesPage() {
  return (
    <div className="p-5 flex flex-col gap-1">
      <BreadcrumbsComponent />
      <DictionaryDataGrid />
    </div>
  );
}
