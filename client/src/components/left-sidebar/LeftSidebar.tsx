import NavigationMenu from "./NavigationMenu";

const LeftSidebar = () => {
  return (
    <aside className="w-72 h-full bg-gray-50 border-r border-gray-200 fixed top-14">
      <NavigationMenu />
    </aside>
  );
};

export default LeftSidebar;
