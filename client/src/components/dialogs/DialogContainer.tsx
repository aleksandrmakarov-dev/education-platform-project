import { Dialog, DialogSurface } from "@fluentui/react-components";
import React, { useState } from "react";

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

interface DialogContainerProps {
  children: React.ReactNode;
}

const DialogContainer: React.ForwardRefRenderFunction<
  DialogHandle,
  DialogContainerProps
> = ({ children }, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog
      modalType="alert"
      open={open}
      onOpenChange={(e, d) => setOpen(d.open)}
    >
      <DialogSurface>{children}</DialogSurface>
    </Dialog>
  );
};

export default React.forwardRef(DialogContainer);
