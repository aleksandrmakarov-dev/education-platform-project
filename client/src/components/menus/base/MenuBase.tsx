import { Menu } from "@mui/material";
import React, { forwardRef, useImperativeHandle } from "react";
import useMenu from "../../../hooks/useMenu";
import { OpenCloseHandle } from "../../../hooks/useImperativeDialog";

interface MenuBaseProps {
  trigger: JSX.Element;
  children: React.ReactNode;
}

const MenuBase: React.ForwardRefRenderFunction<
  OpenCloseHandle,
  MenuBaseProps
> = ({ trigger, children }, ref) => {
  const { anchorEl, open, handleOpen, handleClose } = useMenu();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {},
        close: () => handleClose(),
      };
    },
    []
  );

  return (
    <React.Fragment>
      {React.cloneElement(trigger, { onClick: handleOpen })}
      <Menu
        elevation={1}
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </React.Fragment>
  );
};

export default forwardRef(MenuBase);
