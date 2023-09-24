import { Dictionary, Theme } from "../lib/constants";
import { wait } from "../lib/utils";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/dictionaries";

async function createDictionary(
  values: DictionaryFormSchemaType
): Promise<Dictionary> {
  const response = await axios.post(baseUrl, values);
  return response.data;
}

type GetDictionariesOptions = {
  populateThemes?: boolean;
  populateThemesLimit?: number;
};

async function getDictionaries(options: GetDictionariesOptions) {
  const url = new URL(baseUrl);
  Object.entries(options)
    .map(([key, value]) => ({ key, value }))
    .forEach((p) => url.searchParams.append(p.key, p.value.toString()));

  const response = await axios.get<Dictionary[]>(url.href);
  return response.data;
}

async function getThemesByDictionaryId(id: string) {
  await wait<boolean>(2000, true);

  const response = await axios.get<Theme[]>(`${baseUrl}/id/${id}/themes`);
  return response.data;
}

async function getDictionaryById(id: string) {
  const response = await axios.get<Dictionary>(`${baseUrl}/id/${id}`);
  return response.data;
}

async function updateDictionaryById(params: {
  id: string;
  body: DictionaryFormSchemaType;
}): Promise<Dictionary> {
  const response = await axios.put<Dictionary>(
    `${baseUrl}/id/${params.id}`,
    params.body
  );
  return response.data;
}

export {
  createDictionary,
  getDictionaries,
  getThemesByDictionaryId,
  getDictionaryById,
  updateDictionaryById,
};
