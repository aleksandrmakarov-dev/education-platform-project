import { useEffect, useImperativeHandle, useState } from "react";

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

const useImperativeHandleDialog = (ref?: React.ForwardedRef<DialogHandle>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      };
    },
    []
  );

  return {
    isOpen,
    setIsOpen,
  };
};

export default useImperativeHandleDialog;
