import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";

interface DialogBaseProps {
  trigger: JSX.Element;
  title: string;
  content: JSX.Element;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  primaryBtnColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onCallback: (value: boolean) => void;
}

const DialogBase: React.FC<DialogBaseProps> = ({
  title,
  content,
  trigger,
  primaryBtnLabel,
  secondaryBtnLabel,
  primaryBtnColor,
  onCallback,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const onPrimaryBtnClick = () => {
    handleClose();
    onCallback(true);
  };

  const onSecondaryBtnClick = () => {
    handleClose();
    onCallback(false);
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleOpen })}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={onSecondaryBtnClick}>
            {secondaryBtnLabel ?? "Cancel"}
          </Button>
          <Button
            onClick={onPrimaryBtnClick}
            color={primaryBtnColor ?? "primary"}
            autoFocus
          >
            {primaryBtnLabel ?? "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBase;
