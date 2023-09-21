import React from "react";
import NavigationMenuItem, {
  NavigationMenuItemData,
} from "./NavigationMenuItem";

interface NavigationMenuSectionProps {
  items: NavigationMenuItemData[];
}

const NavigationMenuSection: React.FC<NavigationMenuSectionProps> = ({
  items,
}) => {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <NavigationMenuItem key={item.text} data={item} isActive={i == 0} />
      ))}
    </ul>
  );
};

export default NavigationMenuSection;
