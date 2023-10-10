import WordWriteCard from "../components/cards/word/WordWriteCard/WordWriteCard";
import BreadcrumbsComponent from "../components/shared/breadcrumbs/BreadcrumbsComponent";
import Header from "../components/shared/ui/header/Header";

export default function LearnPage() {
  return (
    <div className="p-5 flex flex-col gap-1">
      <BreadcrumbsComponent />
      <Header
        title={`Practice theme "Vaatteet"`}
        subtitle="Here you can practice multiple choice and writting questions"
      />
      <div className="flex justify-center py-5">
        <div className="w-full max-w-screen-md">
          <WordWriteCard
            data={{
              id: "1", // replace with the actual id
              createdAt: new Date().toISOString(), // replace with the actual creation date
              theme: "Vaatteet", // replace with the actual theme
              text: "Kengät",
              definition: "Shoes",
            }}
          />
        </div>
      </div>
    </div>
  );
}
