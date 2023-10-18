import axios from "axios";
import { wait } from "../utils/utils";
import FileSystemService from "./filesystem.service";

export type CreateAudioResponse = {
  success: boolean;
  id: string;
};

type CreateAudioBody = {
  engine: string;
  data: {
    text: string;
    voice: string;
  };
};

const baseUrl = "https://api.soundoftext.com/sounds";
const ENGINE = "Google";

async function createAudio(text: string, lang: string) {
  const body: CreateAudioBody = {
    engine: ENGINE,
    data: {
      text: text,
      voice: lang,
    },
  };
  const response = await axios.post<CreateAudioResponse>(baseUrl, body);
  return response.data;
}

export type GetAudioResponse = {
  status: "Pending" | "Done" | "Error";
  location: string;
};

async function getAudio(id: string) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

async function createAudioAndGetLocation(text: string, lang: string) {
  const { id } = await createAudio(text, lang);
  let pending = true;
  let retry = 0;

  while (pending || retry < 3) {
    const { status, location } = await getAudio(id);
    if (status === "Done") {
      return location;
    }

    await wait(500);
    pending = status === "Pending";
    retry++;
  }
}

async function createAudioAndUploadToCloudinary(
  text: string,
  lang: string,
  path: string
) {
  const location = await createAudioAndGetLocation(text, lang);
  const { url } = await FileSystemService.uploadResource(location, path);
  return url;
}

const TextToSpeechService = {
  createAudio,
  getAudio,
  createAudioAndGetLocation,
  createAudioAndUploadToCloudinary,
};

export default TextToSpeechService;
