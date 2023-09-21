import {
  Home24Filled,
  Book24Filled,
  Games24Filled,
} from "@fluentui/react-icons";
import NavigationMenuSection from "./NavigationMenuSection";

const mainSection = [
  {
    text: "Home",
    icon: <Home24Filled />,
    route: "/",
  },
  {
    text: "Study",
    icon: <Book24Filled />,
    route: "/study",
  },
  {
    text: "Practice",
    icon: <Games24Filled />,
    route: "/practice",
  },
];

const NavigationMenu = () => {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <NavigationMenuSection items={mainSection} />
    </div>
  );
};

export default NavigationMenu;
