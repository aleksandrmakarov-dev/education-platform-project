import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type SnackbarType = {
  title?: string;
  message: string;
  autoHideDuration?: number;
  originAnchor?: SnackbarOrigin;
  type?: AlertColor;
};

export type SnackbarWithIdType = {
  id: string;
} & SnackbarType;

export type SnackbarContextType = {
  push: (value: SnackbarType) => void;
};

const defaultValues: SnackbarContextType = {
  push: (_v) => {},
};

const SnackbarContext = createContext<SnackbarContextType>(defaultValues);

export const SnackbarProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [snackbars, setSnackbars] = useState<SnackbarWithIdType[]>([]);
  const [activeItem, setActiveItem] = useState<SnackbarWithIdType | undefined>(
    undefined
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (snackbars.length === 0) {
      setOpen(false);
      return;
    }

    if (activeItem) {
      return;
    }

    setActiveItem({ ...snackbars[0] });
    setOpen(true);
  }, [snackbars]);

  const push = (value: SnackbarType) => {
    const item: SnackbarWithIdType = { ...value, id: uuidv4() };
    const afterPush = [...snackbars, item];
    setSnackbars(afterPush);
  };

  const pop = () => {
    if (!activeItem) {
      return;
    }

    setActiveItem(undefined);

    const afterPop = snackbars.filter((item) => item.id !== activeItem.id);
    setSnackbars(afterPop);
  };

  const close = () => {
    setOpen(false);
  };

  const handleClose = (
    _event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "timeout") {
      close();
    }
  };

  const handleExited = () => {
    pop();
  };

  return (
    <SnackbarContext.Provider value={{ push }}>
      <>
        <Snackbar
          autoHideDuration={activeItem?.autoHideDuration ?? 5000}
          onClose={handleClose}
          open={open}
          anchorOrigin={
            activeItem?.originAnchor ?? {
              horizontal: "right",
              vertical: "bottom",
            }
          }
          TransitionProps={{ onExited: handleExited }}
        >
          <Alert
            onClose={close}
            severity={activeItem?.type}
            sx={{ width: "100%" }}
          >
            {activeItem?.title && <AlertTitle>{activeItem?.title}</AlertTitle>}
            {activeItem?.message}
          </Alert>
        </Snackbar>
        {children}
      </>
    </SnackbarContext.Provider>
  );
};

export default function useSnackbar() {
  return useContext(SnackbarContext);
}
