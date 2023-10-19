import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import SignInUser from "./SignInUser";

interface TopbarProps {
  appName: string;
}

const Topbar: React.FC<TopbarProps> = ({ appName }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-screen-xl px-2 sm:px-5 mx-auto py-2.5 flex items-center justify-between">
        <a href="/" className="flex gap-2 items-center text-blue-500">
          <WhatshotRoundedIcon />
          <h5 className="text-xl font-semibold">{appName}</h5>
        </a>
        <div className="flex gap-10 items-center">
          <SignInUser />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
