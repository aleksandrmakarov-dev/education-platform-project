import { IconButton, IconButtonProps } from "@mui/material";
import React, { forwardRef } from "react";
import useAudio from "../../../hooks/shared/useAudio";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface PlaySoundButtonProps extends IconButtonProps {
  url?: string;
}

const PlaySoundButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  PlaySoundButtonProps
> = ({ url, ...props }, ref) => {
  const { playing, toggle } = useAudio({ url: url });

  if (!url) return null;

  return (
    <IconButton {...props} onClick={toggle} ref={ref}>
      {playing ? (
        <VolumeOffIcon fontSize="inherit" />
      ) : (
        <VolumeUpIcon fontSize="inherit" />
      )}
    </IconButton>
  );
};

export default forwardRef(PlaySoundButton);
