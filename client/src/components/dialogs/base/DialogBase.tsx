import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import useImperativeHandleDialog, {
  OpenCloseHandle,
} from "../../../hooks/shared/useImperativeDialog";

interface DialogBaseProps {
  trigger?: JSX.Element;
  title: string;
  children: React.ReactNode;
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
  isBusy?: boolean;
  onSubmit: () => Promise<void>;
}

const DialogBase: React.ForwardRefRenderFunction<
  OpenCloseHandle,
  DialogBaseProps
> = (
  {
    title,
    trigger,
    children,
    primaryBtnLabel,
    secondaryBtnLabel,
    primaryBtnColor,
    isBusy,
    onSubmit,
  },
  ref
) => {
  const { isOpen, handleOpen, handleClose } = useImperativeHandleDialog(ref);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onCloseDialog = () => {
    handleClose();
  };

  return (
    <>
      {trigger && React.cloneElement(trigger, { onClick: handleOpen })}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} disabled={isBusy}>
            <span>{secondaryBtnLabel ?? "Cancel"}</span>
          </Button>
          <LoadingButton
            type="submit"
            color={primaryBtnColor ?? "primary"}
            loading={isBusy}
            variant="contained"
            autoFocus
            disableElevation
            onClick={onSubmit}
          >
            <span>{primaryBtnLabel ?? "Confirm"}</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.forwardRef(DialogBase);
