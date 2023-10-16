import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";
import React, { forwardRef } from "react";

interface LoadingIconButtonProps extends IconButtonProps {
  loading?: boolean;
}

const LoadingIconButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  LoadingIconButtonProps
> = ({ loading, ...props }, ref) => {
  return (
    <IconButton ref={ref} {...props} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </IconButton>
  );
};

export default forwardRef(LoadingIconButton);
