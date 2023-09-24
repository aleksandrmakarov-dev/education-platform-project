import { Button } from "@fluentui/react-components";
import BreadcrumbContainer from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import { BookAdd24Filled } from "@fluentui/react-icons";
import DictionaryList from "../components/lists/dictionary-list/DictionaryList";
import DictionaryListEmpty from "../components/lists/dictionary-list/DictionaryListEmpty";
import DictionaryListLoading from "../components/lists/dictionary-list/DictionaryListLoading";
import DictionaryListError from "../components/lists/dictionary-list/DictionaryListError";
import { useQuery } from "@tanstack/react-query";
import { getDictionaries } from "../services/dictionaries.service";
import DictionaryCreateFormDialog from "../components/dialogs/dictionary-dialogs/DictionaryCreateFormDialog";
import { Dictionary } from "../lib/constants";

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

const DictionariesPage = () => {
  const {
    data: dictionaries,
    isLoading: isDictionariesLoading,
    isError: isDictionariesError,
  } = useQuery<Dictionary[]>({
    queryKey: ["dictionaries-list"],
    queryFn: async () =>
      await getDictionaries({
        populateThemes: true,
        populateThemesLimit: 6,
      }),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <div className="flex flex-col gap-3">
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <Header text="Dictionaries" />
        <DictionaryCreateFormDialog
          trigger={
            <Button appearance="primary" icon={<BookAdd24Filled />}>
              Create Dictionary
            </Button>
          }
        />
      </div>
      <DictionaryList
        dictionaries={dictionaries}
        isDictionariesLoading={isDictionariesLoading}
        isDictionariesError={isDictionariesError}
        emptyView={<DictionaryListEmpty />}
        loadingView={<DictionaryListLoading />}
        errorView={<DictionaryListError />}
      />
    </div>
  );
};

export default DictionariesPage;
