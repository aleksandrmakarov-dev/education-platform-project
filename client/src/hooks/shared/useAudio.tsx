import { useEffect, useState } from "react";

type Params = {
  url: string;
};

export default function useAudio(params: Params) {
  const [audio] = useState<HTMLAudioElement>(new Audio(params.url));
  const [playing, setPlaying] = useState<boolean>(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle };
}
