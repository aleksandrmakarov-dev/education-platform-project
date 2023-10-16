import axios from "axios";
import { languagesAndCodes } from "../lib/constants";

const ENGINE = "Google";
const baseUrl = "https://api.soundoftext.com/sounds";

function getLanguages() {
  return languagesAndCodes;
}

type CreateSoundParams = {
  text: string;
  voice: string;
};

export type CreateSoundResponse = {
  success: boolean;
  id: string;
};

async function createSound(params: CreateSoundParams) {
  const body = {
    engine: ENGINE,
    data: {
      text: params.text,
      voice: params.voice,
    },
  };
  const response = await axios.post<CreateSoundResponse>(baseUrl, body);
  return response.data;
}

type GetAudioParams = {
  id: string;
};

export type GetAudioResponse = {
  status: "Pending" | "Done" | "Error";
  location?: string;
};

async function getSound(params: GetAudioParams) {
  const response = await axios.get<GetAudioResponse>(`${baseUrl}/${params.id}`);
  return response.data;
}

const TextToSpeechService = {
  getLanguages,
  createSound,
  getSound,
};

export default TextToSpeechService;
