import React from "react";
import { cn } from "../../lib/utils";

export type NavigationMenuItemData = {
  text: string;
  icon?: JSX.Element;
  route: string;
};

interface NavigationMenuItemProps {
  data: NavigationMenuItemData;
  isActive?: boolean;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  data,
  isActive,
}) => {
  return (
    <li
      className={cn(
        "flex gap-2 items-center text-gray-800 hover:bg-gray-200 font-semibold px-2 py-1 rounded-md",
        {
          "!bg-blue-100 text-blue-500": isActive,
        }
      )}
    >
      {data.icon}
      <a className="w-full" href={data.route}>
        {data.text}
      </a>
    </li>
  );
};

export default NavigationMenuItem;
