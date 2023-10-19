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
import LoadingButton from "@mui/lab/LoadingButton";
import useImperativeHandleDialog, {
  OpenCloseHandle,
} from "../../../hooks/shared/useImperativeDialog";

interface DialogFormBaseProps {
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
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  reset: () => void;
}

const DialogFormBase: React.ForwardRefRenderFunction<
  OpenCloseHandle,
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onCloseDialog = () => {
    reset();
    handleClose();
  };

  return (
    <>
      {trigger && React.cloneElement(trigger, { onClick: handleOpen })}
      <Dialog
        open={isOpen}
        onClose={onCloseDialog}
        fullScreen={fullScreen}
        fullWidth
      >
        <form onSubmit={onSubmit} className="flex-1 flex flex-col">
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
            >
              <span>{primaryBtnLabel ?? "Confirm"}</span>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default React.forwardRef(DialogFormBase);
