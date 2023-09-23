import { DocumentAdd24Filled } from "@fluentui/react-icons";
import BreadcrumbContainer, {
  BreadcrumbItemData,
} from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { Button } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Dictionary, Theme, dictionariesMockData } from "../lib/constants";
import ThemeList from "../components/lists/theme-list/ThemeList";
import { useParams } from "react-router-dom";
import ThemeListEmpty from "../components/lists/theme-list/ThemeListEmpty";

export default function DictionaryDetailsPage() {
  const { slug } = useParams();

  const [dictionary, setDictionary] = useState<Dictionary | undefined>(
    undefined
  );

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    BreadcrumbItemData[] | undefined
  >(undefined);

  useEffect(() => {
    if (!slug) {
      return;
    }
    setDictionary(dictionariesMockData.find((d) => d.id === slug));

    if (!dictionary) {
      return;
    }

    const items = [
      {
        text: "Home",
        route: "/",
      },
      {
        text: "Dictionaries",
        route: "/dictionaries",
      },
      {
        text: dictionary.name,
        route: `/study/${dictionary.id}`,
      },
    ];

    setBreadcrumbItems(items);
  });

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text={dictionary?.name ?? "Dictionary"} />
        <Button appearance="primary" icon={<DocumentAdd24Filled />}>
          Create Theme
        </Button>
      </div>
      <ThemeList themes={dictionary?.themes} emptyView={<ThemeListEmpty />} />
    </div>
  );
}
