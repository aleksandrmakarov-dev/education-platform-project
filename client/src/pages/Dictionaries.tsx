import { Button } from "@fluentui/react-components";
import BreadcrumbContainer from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { BookAdd24Filled } from "@fluentui/react-icons";
import { Dictionary, dictionariesMockData, mockDelay } from "../lib/constants";
import DictionaryCreateUpdateialog from "../components/dialogs/dictionary-dialogs/DictionaryCreateUpdateDialog";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import { useRef, useState } from "react";
import { DialogHandle } from "../components/dialogs/DialogContainer";
import { wait } from "../lib/utils";
import DictionaryList from "../components/lists/dictionary-list/DictionaryList";
import DictionaryListEmpty from "../components/lists/dictionary-list/DictionaryListEmpty";

const breadcrumbItems = [
  {
    text: "Home",
    route: "/",
  },
  {
    text: "Dictionaries",
    route: "/dictionaries",
  },
];

const getId = () => {
  return Math.round(Math.random() % 1000000);
};

const DictionariesPage = () => {
  const [dictionaries, setDictionaries] =
    useState<Dictionary[]>(dictionariesMockData);

  const createDictionaryRef = useRef<DialogHandle>(null);

  const onCreateDictionary = async (values: DictionaryFormSchemaType) => {
    await wait<boolean>(mockDelay, true);
    setDictionaries(
      dictionaries.concat({ id: getId().toString(), name: values.name })
    );
    createDictionaryRef.current?.close();
    return true;
  };

  const onUpdateDictionary = async (
    id: string,
    values: DictionaryFormSchemaType
  ) => {
    await wait<boolean>(mockDelay, true);

    const updatedDictionaries = dictionaries.map((d) =>
      d.id === id ? { ...d, name: values.name } : d
    );
    setDictionaries(updatedDictionaries);
    return true;
  };

  const onRemoveDictionary = async (id: string) => {
    await wait<boolean>(mockDelay, true);
    setDictionaries(dictionaries.filter((d) => d.id !== id));
    return true;
  };

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text="Dictionaries" />
        <Button
          appearance="primary"
          icon={<BookAdd24Filled />}
          onClick={() => createDictionaryRef.current?.open()}
        >
          Create Dictionary
        </Button>
        <DictionaryCreateUpdateialog
          ref={createDictionaryRef}
          onSubmitCallback={onCreateDictionary}
          title="Create Dictionary"
        />
      </div>
      <DictionaryList
        dictionaries={dictionaries}
        onRemoveCallback={onRemoveDictionary}
        onUpdateCallback={onUpdateDictionary}
        emptyView={<DictionaryListEmpty />}
      />
    </div>
  );
};

export default DictionariesPage;
