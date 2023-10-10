import { useParams } from "react-router-dom";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";
import LearnView from "../components/views/learn/LearnView";

export default function LearnPage() {
  const { themeId } = useParams<{ themeId: string }>();

  return (
    <div className="p-5 flex flex-col gap-1">
      <BreadcrumbsComponent />
      <Header
        title={`Practice theme "Vaatteet"`}
        subtitle="Here you can practice multiple choice and writting questions"
      />
      <div className="flex justify-center py-5">
        {themeId && <LearnView themeId={themeId} />}
      </div>
    </div>
  );
}
