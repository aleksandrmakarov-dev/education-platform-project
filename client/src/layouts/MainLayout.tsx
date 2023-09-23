import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/left-sidebar/LeftSidebar";
import Topbar from "../components/topbar/Topbar";

export default function MainLayout() {
  return (
    <div>
      <Topbar />
      <div className="flex">
        <LeftSidebar />
        <div className="bg-white w-full ml-72">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
