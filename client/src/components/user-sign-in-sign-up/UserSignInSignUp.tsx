import {
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItem,
  Divider,
} from "@fluentui/react-components";
import UserAvatar from "./UserAvatar";

const UserSignInSignUp = () => {
  const isSignedIn = true;

  if (isSignedIn) {
    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="transparent">
            <UserAvatar
              name="Alex"
              image="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg"
              fallback="A"
            />
          </Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <Divider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  }

  return <div>Not signedIn</div>;
};

export default UserSignInSignUp;
