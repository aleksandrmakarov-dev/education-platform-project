import { Button } from "@fluentui/react-components";
import BreadcrumbContainer from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { BookAdd24Filled } from "@fluentui/react-icons";
import { Dictionary, dictionariesMockData, mockDelay } from "../lib/constants";
import DictionaryCard from "../components/cards/dictionary-card/DictionaryCard";
import DictionaryDialog from "../components/dialogs/DictionaryDialog";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import { useRef, useState } from "react";
import { DialogHandle } from "../components/dialogs/DialogContainer";
import { wait } from "../lib/utils";

const breadcrumbItems = [
  {
    text: "Home",
    route: "/",
  },
  {
    text: "Study",
    route: "/study",
  },
];

const getId = () => {
  return Math.round(Math.random() % 1000000);
};

const StudyPage = () => {
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
    <div>
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="my-3 flex justify-between items-center">
        <Header text="Study" />
        <Button
          appearance="primary"
          icon={<BookAdd24Filled />}
          onClick={() => createDictionaryRef.current?.open()}
        >
          Create Dictionary
        </Button>
        <DictionaryDialog
          ref={createDictionaryRef}
          onSubmitCallback={onCreateDictionary}
          title="Create Dictionary"
        />
      </div>
      <div className="flex flex-col gap-2">
        {dictionaries.map((item, i) => (
          <DictionaryCard
            key={`dictionary-${i}`}
            dictionary={item}
            onUpdateCallback={onUpdateDictionary}
            onRemoveCallback={onRemoveDictionary}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyPage;
