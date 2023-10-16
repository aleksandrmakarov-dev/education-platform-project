import { IconButton } from "@mui/material";
import React from "react";
import useAudio from "../../../hooks/shared/useAudio";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface PlaySoundButtonProps {
  url: string;
}

const PlaySoundButton: React.FC<PlaySoundButtonProps> = ({ url }) => {
  const { playing, toggle } = useAudio({ url: url });
  return (
    <IconButton onClick={toggle}>
      {playing ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
};

export default PlaySoundButton;
