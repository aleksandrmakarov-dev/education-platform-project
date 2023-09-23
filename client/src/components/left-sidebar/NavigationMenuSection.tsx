import React from "react";
import NavigationMenuItem, {
  NavigationMenuItemData,
} from "./NavigationMenuItem";

interface NavigationMenuSectionProps {
  items: NavigationMenuItemData[];
  pathname: string;
}

const NavigationMenuSection: React.FC<NavigationMenuSectionProps> = ({
  items,
  pathname,
}) => {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item, i) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname == item.route;
        return (
          <NavigationMenuItem key={item.text} data={item} isActive={isActive} />
        );
      })}
    </ul>
  );
};

export default NavigationMenuSection;
