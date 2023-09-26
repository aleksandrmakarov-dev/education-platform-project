import React from "react";
import NavigationMenuItem, {
  NavigationMenuItemData,
} from "./NavigationMenuItem";
import { List } from "@mui/material";

interface NavigationMenuSectionProps {
  items: NavigationMenuItemData[];
  pathname: string;
}

const NavigationMenuSection: React.FC<NavigationMenuSectionProps> = ({
  items,
  pathname,
}) => {
  return (
    <List>
      {items.map((item, i) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname == item.route;
        return (
          <NavigationMenuItem key={item.text} data={item} isActive={isActive} />
        );
      })}
    </List>
  );
};

export default NavigationMenuSection;
