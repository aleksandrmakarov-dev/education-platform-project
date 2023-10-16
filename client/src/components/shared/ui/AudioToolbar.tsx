import React from "react";
import GenerateSoundButton from "./GenerateSoundButton";
import PlaySoundButton from "./PlaySoundButton";
import { Tooltip } from "@mui/material";

interface AudioToolbarProps {
  lang: string;
  url?: string;
  text: string;
  onAudioGenerated?: (url: string) => void;
  path?: string;
}

const AudioToolbar: React.FC<AudioToolbarProps> = ({
  lang,
  url,
  text,
  onAudioGenerated,
  path,
}) => {
  return (
    <div className="flex gap-1 items-center">
      {url && <PlaySoundButton url={url} />}
      <Tooltip title="Generate audio">
        <GenerateSoundButton
          lang={lang}
          text={text}
          onAudioGenerated={onAudioGenerated}
          path={path}
        />
      </Tooltip>
    </div>
  );
};

export default AudioToolbar;
