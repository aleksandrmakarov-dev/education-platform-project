import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { BookLetter24Filled, Open16Filled } from "@fluentui/react-icons";
import React from "react";
import { Theme } from "../../lib/constants";

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <Card>
      <CardPreview className="h-24 bg-gray-200 p-4">
        <BookLetter24Filled className="text-white" />
      </CardPreview>
      <CardHeader
        header={<p className="font-semibold text-gray-800">{theme.title}</p>}
        description={<p className="text-gray-600">{theme.description}</p>}
      />
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <Button appearance="primary" icon={<Open16Filled />}>
            Open
          </Button>
          <p className="text-xs uppercase">{theme.count} word(s)</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThemeCard;
