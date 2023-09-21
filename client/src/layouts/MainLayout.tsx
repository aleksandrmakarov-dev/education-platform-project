import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import Topbar from "../components/topbar/Topbar";

export default function MainLayout() {
  return (
    <div>
      <Topbar />
      <div className="flex">
        <LeftSidebar />
        <div className="bg-white w-full min-h-[1440px] ml-72">content</div>
      </div>
    </div>
  );
}
