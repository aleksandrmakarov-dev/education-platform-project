import Topbar from "../components/shared/ui/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar appName="Squeezelet" />
      <div className="flex flex-1 bg-gray-50">
        <div className="p-5 w-full max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
