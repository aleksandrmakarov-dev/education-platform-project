import axios from "axios";
import { wait } from "../utils/utils";

export type CreateSoundResponse = {
  success: boolean;
  id: string;
};

type CreateSoundBody = {
  engine: string;
  data: {
    text: string;
    voice: string;
  };
};

const baseUrl = "https://api.soundoftext.com/sounds";
const ENGINE = "Google";

async function createSound(text: string, lang: string) {
  const body: CreateSoundBody = {
    engine: ENGINE,
    data: {
      text: text,
      voice: lang,
    },
  };
  const response = await axios.post<CreateSoundResponse>(baseUrl, body);
  return response.data;
}

export type GetSoundResponse = {
  status: "Pending" | "Done" | "Error";
  location: string;
};

async function getSound(id: string) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

async function createSoundAndGetUrl(text: string, lang: string) {
  const { id } = await createSound(text, lang);
  let pending = true;
  let retry = 0;

  while (pending || retry < 3) {
    const { status, location } = await getSound(id);
    if (status === "Done") {
      return location;
    }

    await wait(500);
    pending = status === "Pending";
    retry++;
  }
}

const TextToSpeechService = { createSound, getSound, createSoundAndGetUrl };

export default TextToSpeechService;
