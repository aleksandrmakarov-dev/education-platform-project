import { Typography } from "@mui/material";
import HeaderSkeleton from "./HeaderSkeleton";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  isBusy?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, isBusy }) => {
  if (isBusy) {
    return <HeaderSkeleton />;
  }

  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
    </div>
  );
};

export default Header;
