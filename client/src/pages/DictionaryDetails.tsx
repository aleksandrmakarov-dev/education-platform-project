import { DocumentAdd24Filled } from "@fluentui/react-icons";
import BreadcrumbContainer, {
  BreadcrumbItemData,
} from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { Button } from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react";
import {
  Dictionary,
  Theme,
  dictionariesMockData,
  mockDelay,
} from "../lib/constants";
import ThemeList from "../components/lists/theme-list/ThemeList";
import { useParams } from "react-router-dom";
import ThemeListEmpty from "../components/lists/theme-list/ThemeListEmpty";
import ThemeCreateUpdateDialog from "../components/dialogs/theme-dialogs/ThemeCreateUpdateDialog";
import { DialogHandle } from "../components/dialogs/DialogContainer";
import { ThemeFormSchemaType } from "../lib/validations/theme-form.schema";
import { wait } from "../lib/utils";

export default function DictionaryDetailsPage() {
  const { slug } = useParams();

  const [dictionary, setDictionary] = useState<Dictionary | undefined>(
    undefined
  );

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    BreadcrumbItemData[] | undefined
  >(undefined);

  const createThemeRef = useRef<DialogHandle>(null);

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

  const onCreateTheme = async (values: ThemeFormSchemaType) => {
    await wait<boolean>(mockDelay, true);
    createThemeRef.current?.close();
    console.log("Created");
    return true;
  };

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text={dictionary?.name ?? "Dictionary Details"} />
        <Button
          appearance="primary"
          icon={<DocumentAdd24Filled />}
          onClick={() => createThemeRef.current?.open()}
        >
          Create Theme
        </Button>
        <ThemeCreateUpdateDialog
          ref={createThemeRef}
          title="Create Theme"
          onSubmitCallback={onCreateTheme}
        />
      </div>
      <ThemeList themes={dictionary?.themes} emptyView={<ThemeListEmpty />} />
    </div>
  );
}
