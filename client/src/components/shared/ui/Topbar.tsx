import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { Button, Divider } from "@mui/material";

interface TopbarProps {
  appName: string;
}

const Topbar: React.FC<TopbarProps> = ({ appName }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="px-10 py-2.5 flex items-center justify-between">
        <div className="flex gap-2 items-center text-blue-500">
          <WhatshotRoundedIcon />
          <h5 className="text-xl font-semibold">{appName}</h5>
        </div>
        <div>
          <Divider orientation="vertical" flexItem />
          <Button variant="contained" disableElevation>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;