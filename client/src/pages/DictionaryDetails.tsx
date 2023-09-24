import { DocumentAdd24Filled } from "@fluentui/react-icons";
import BreadcrumbContainer, {
  BreadcrumbItemData,
} from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { Button } from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react";
import { mockDelay } from "../lib/constants";
import ThemeList from "../components/lists/theme-list/ThemeList";
import { useParams } from "react-router-dom";
import ThemeListEmpty from "../components/lists/theme-list/ThemeListEmpty";
import { ThemeFormSchemaType } from "../lib/validations/theme-form.schema";
import { wait } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  getDictionaryById,
  getThemesByDictionaryId,
} from "../services/dictionaries.service";
import ThemeListLoading from "../components/lists/theme-list/ThemeListLoading";
import ThemeListError from "../components/lists/theme-list/ThemeListError";

export default function DictionaryDetailsPage() {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    BreadcrumbItemData[] | undefined
  >(undefined);

  const {
    data: dictionary,
    isLoading: isDictionaryLoading,
    isError: isDictionaryError,
  } = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => await getDictionaryById(id),
    refetchOnWindowFocus: false,
  });

  const {
    data: themes,
    isLoading: isThemesLoading,
    isError: isThemesError,
  } = useQuery({
    queryKey: ["themes-list"],
    queryFn: async () => await getThemesByDictionaryId(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
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
        text: dictionary?.title,
        route: `/study/${dictionary.id}`,
      },
    ];

    setBreadcrumbItems(items);
  }, [dictionary]);

  const onCreateTheme = async (values: ThemeFormSchemaType) => {
    await wait<boolean>(mockDelay, true);
    return true;
  };

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text={dictionary?.title ?? ""} />
        <Button appearance="primary" icon={<DocumentAdd24Filled />}>
          Create Theme
        </Button>
      </div>
      <ThemeList
        themes={themes}
        isThemesLoading={isThemesLoading}
        isThemesError={isThemesError}
        emptyView={<ThemeListEmpty />}
        loadingView={<ThemeListLoading />}
        errorView={<ThemeListError />}
      />
    </div>
  );
}
