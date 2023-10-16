import React, { forwardRef, useState } from "react";
import LoadingIconButton from "./LoadingIconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TextToSpeechService from "../../../services/text-to-speech.service";
import { IconButtonProps } from "@mui/material";
import FileSystemService from "../../../services/filesystem.service";

interface GenerateSoundButtonProps extends IconButtonProps {
  text: string;
  lang: string;
  onAudioGenerated?: (url: string) => void;
  path?: string;
}

const GenerateSoundButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  GenerateSoundButtonProps
> = ({ text, lang, onAudioGenerated, path, ...props }, ref) => {
  const [loading, setLoading] = useState<boolean>(false);

  const generateAudioAndGetUrl = async (text: string, voice: string) => {
    const { id } = await TextToSpeechService.createSound({
      text: text,
      voice: voice,
    });

    let status = "Pending";
    let retry = 0;

    while (status === "Pending" || retry < 5) {
      const { status, location } = await TextToSpeechService.getSound({
        id: id,
      });
      if (status === "Done") {
        if (location && onAudioGenerated) {
          return location;
        }
      }

      if (status === "Error") {
        throw new Error("Error generating audio");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("retrying", retry);
      retry++;
    }

    throw new Error("Error generating audio");
  };

  const onClick = async () => {
    if (!text || !lang) {
      return;
    }

    setLoading(true);
    try {
      const location = await generateAudioAndGetUrl(text, lang);
      const signature = await FileSystemService.getSignature(path);
      const { url } = await FileSystemService.uploadFile(location, signature);
      if (onAudioGenerated) {
        onAudioGenerated(url);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingIconButton
      ref={ref}
      size="small"
      onClick={onClick}
      loading={loading}
      {...props}
    >
      <FileDownloadIcon />
    </LoadingIconButton>
  );
};

export default forwardRef(GenerateSoundButton);
