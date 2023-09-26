import { useEffect, useState } from "react";

export default function usMenuHook() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(Boolean(anchorEl));
  }, [anchorEl]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return {
    isOpen,
    anchorEl,
    handleOpen,
    handleClose,
  };
}
