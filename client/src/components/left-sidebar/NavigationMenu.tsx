import NavigationMenuSection from "./NavigationMenuSection";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SourceIcon from "@mui/icons-material/Source";
import ExtensionIcon from "@mui/icons-material/Extension";
import { Divider } from "@mui/material";

const mainSection = [
  {
    text: "Home",
    icon: <HomeIcon />,
    route: "/",
  },
  {
    text: "Dictionaries",
    icon: <SourceIcon />,
    route: "/dictionaries",
  },
  {
    text: "Practice",
    icon: <ExtensionIcon />,
    route: "/practice",
  },
];

const NavigationMenu = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <NavigationMenuSection items={mainSection} pathname={pathname} />
    </div>
  );
};

export default NavigationMenu;
