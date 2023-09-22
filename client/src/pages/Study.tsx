import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import BreadcrumbContainer from "../components/breadcrumb/BreadcrumbContainer";
import Header from "../components/header/Header";
import {
  BookAdd24Filled,
  BookLetter24Filled,
  Open16Regular,
} from "@fluentui/react-icons";
import { dictionariesMockData } from "../lib/constants";
import { Link } from "react-router-dom";

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

const StudyPage = () => {
  return (
    <div>
      <BreadcrumbContainer items={breadcrumbItems} />
      <div className="my-3 flex justify-between items-center">
        <Header text="Study" />
        <Button appearance="primary" icon={<BookAdd24Filled />}>
          Create Dictionary
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {dictionariesMockData.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-sm px-2 py-3">
            <div className="mb-2">
              <Link
                className="font-semibold text-gray-700 hover:underline uppercase"
                to="/"
              >
                {item.name}
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {item.themes.map((theme, i) => (
                <Card key={`${item.name}-${i}`}>
                  <CardPreview className="h-24 bg-gray-200 p-4">
                    <BookLetter24Filled className="text-white" />
                  </CardPreview>
                  <CardHeader
                    header={
                      <p className="font-semibold text-gray-800">
                        {theme.name}
                      </p>
                    }
                    description={
                      <p className="text-gray-600">{theme.description}</p>
                    }
                  />
                  <CardFooter>
                    <div className="w-full flex items-center justify-between">
                      <Button appearance="primary" icon={<Open16Regular />}>
                        Show
                      </Button>
                      <p className="text-xs uppercase">{theme.count} word(s)</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="p-2 text-blue-500 font-semibold hover:underline"
              >
                Show All
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPage;
