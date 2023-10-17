import { useEffect, useState } from "react";

type Params = {
  url?: string;
};

export default function useAudio(params: Params) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState<boolean>(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    const audio = new Audio(params.url);
    audio.addEventListener("ended", () => setPlaying(false));
    setAudio(audio);
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [params.url]);

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  return { playing, toggle };
}
