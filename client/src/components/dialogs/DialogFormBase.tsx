import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import useImperativeHandleDialog, {
  DialogHandle,
} from "../../hooks/useImperativeDialog";
import LoadingButton from "@mui/lab/LoadingButton";

interface DialogFormBaseProps {
  trigger: JSX.Element;
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
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  reset: () => void;
}

const DialogFormBase: React.ForwardRefRenderFunction<
  DialogHandle,
  DialogFormBaseProps
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
    reset,
  },
  ref
) => {
  const { isOpen, handleOpen, handleClose } = useImperativeHandleDialog(ref);

  const onCloseDialog = () => {
    reset();
    handleClose();
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
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog} disabled={isBusy}>
              {secondaryBtnLabel ?? "Cancel"}
            </Button>
            <LoadingButton
              type="submit"
              color={primaryBtnColor ?? "primary"}
              loading={isBusy}
              variant="contained"
              autoFocus
              disableElevation
            >
              {primaryBtnLabel ?? "Confirm"}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default React.forwardRef(DialogFormBase);
