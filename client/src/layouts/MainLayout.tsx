import Topbar from "../components/layout-components/Topbar";
import Sidebar from "../components/layout-components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="p-5 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
