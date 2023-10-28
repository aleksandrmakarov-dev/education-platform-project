import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import React from "react";
import useCurrentUser from "../../../hooks/shared/useCurrentUser";
import { signInWithGoogle } from "../../../services/auth.service";
import GoogleIcon from "@mui/icons-material/Google";
import { useLocation } from "react-router-dom";
import useSnackbar from "../../../hooks/shared/useSnackbar";

const SignInUser = () => {
  const { user, isLoading } = useCurrentUser();
  const location = useLocation();
  const { push } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignInWithGoogle = async () => {
    try {
      const response = await signInWithGoogle();
      window.location.href =
        location.state?.from?.pathname || response.redirect;
    } catch (error: any) {
      console.log("sign in with google", error);
      push({
        title: "Sign in with Google",
        message: error.message,
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  if (!user) {
    return (
      <Button
        startIcon={<GoogleIcon />}
        variant="contained"
        onClick={onSignInWithGoogle}
        disableElevation
      >
        Sign In
      </Button>
    );
  }

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar src={user.image} sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        elevation={3}
      >
        <div className="px-4 pb-2">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-sm text-gray-700">{user.email}</p>
        </div>
        <Divider />
        <a href="/sign-out">
          <MenuItem dense>Sign Out</MenuItem>
        </a>
      </Menu>
    </>
  );
};

export default SignInUser;
