import BreadcrumbContainer, {
  BreadcrumbItemData,
} from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
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
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ThemeCreateFormDialog from "../components/dialogs/theme-dialogs/ThemeCreateFormDialog";

export default function DictionaryDetailsPage() {
  const { dictionaryId } = useParams();

  if (!dictionaryId) {
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
    queryFn: async () => await getDictionaryById(dictionaryId),
    refetchOnWindowFocus: false,
  });

  const {
    data: themes,
    isLoading: isThemesLoading,
    isError: isThemesError,
  } = useQuery({
    queryKey: ["themes-list"],
    queryFn: async () => await getThemesByDictionaryId(dictionaryId),
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
        route: `/study/${dictionaryId}`,
      },
    ];

    setBreadcrumbItems(items);
  }, [dictionary]);

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text={dictionary?.title ?? ""} />
        <ThemeCreateFormDialog
          trigger={
            <Button
              variant="contained"
              disableElevation
              startIcon={<NoteAddIcon />}
            >
              Create Theme
            </Button>
          }
          dictionaryId={dictionaryId}
        />
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
