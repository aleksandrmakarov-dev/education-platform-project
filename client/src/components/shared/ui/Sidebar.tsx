import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

type ItemData = {
  name: string;
  icon: JSX.Element;
  route: string;
};

const items: ItemData[] = [
  {
    name: "Home",
    icon: <HomeRoundedIcon />,
    route: "/",
  },
  {
    name: "Dictionaries",
    icon: <FolderRoundedIcon />,
    route: "/dictionaries",
  },
];

const Sidebar = () => {
  return (
    <List className="w-72 border-r border-gray-200">
      {items.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton href={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
