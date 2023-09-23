import {
  Home24Filled,
  Book24Filled,
  Games24Filled,
} from "@fluentui/react-icons";
import NavigationMenuSection from "./NavigationMenuSection";
import { useLocation } from "react-router-dom";

const mainSection = [
  {
    text: "Home",
    icon: <Home24Filled />,
    route: "/",
  },
  {
    text: "Dictionaries",
    icon: <Book24Filled />,
    route: "/dictionaries",
  },
  {
    text: "Practice",
    icon: <Games24Filled />,
    route: "/practice",
  },
];

const NavigationMenu = () => {
  const { pathname } = useLocation();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <NavigationMenuSection items={mainSection} pathname={pathname} />
    </div>
  );
};

export default NavigationMenu;
