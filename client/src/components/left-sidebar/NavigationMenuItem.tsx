import React from "react";
import { cn } from "../../lib/utils";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

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
    <ListItem disablePadding>
      <ListItemButton selected={isActive} href={data.route}>
        <ListItemIcon>{data.icon}</ListItemIcon>
        <ListItemText>{data.text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default NavigationMenuItem;
