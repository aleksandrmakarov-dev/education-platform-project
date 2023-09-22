import AppLogo from "./AppLogo";
import UserSignInSignUp from "../user-sign-in-sign-up/UserSignInSignUp";
import { Input } from "@fluentui/react-components";

const Topbar = () => {
  return (
    <div className="border-b border-gray-200 sticky top-0 h-14 bg-white flex items-center w-full px-6 z-50">
      <div className="flex gap-10 justify-between items-center w-full">
        <AppLogo />
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." />
          <UserSignInSignUp />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
