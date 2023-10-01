import { DictionariesPage, Dictionary, Theme, ThemesPage } from "../lib/types";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/dictionaries";

async function createDictionary(
  values: DictionaryFormSchemaType
): Promise<Dictionary> {
  const response = await axios.post(baseUrl, values);
  return response.data;
}

export type GetDictionariesParams = {
  page: number;
  limit: number;
  populateThemes?: boolean;
  populateThemesLimit?: number;
};

async function getDictionaries(searchParams: GetDictionariesParams) {
  const url = new URL(baseUrl);
  Object.entries(searchParams)
    .map(([key, value]) => ({ key, value }))
    .forEach((p) => url.searchParams.append(p.key, p.value.toString()));

  const response = await axios.get<DictionariesPage>(url.href);
  return response.data;
}

export type GetThemesByDictionaryIdParams = {
  page: number;
  limit: number;
  populateThemes?: boolean;
  populateThemesLimit?: number;
};

async function getThemesByDictionaryId(params: {
  id: string;
  searchParams: GetThemesByDictionaryIdParams;
}) {
  const { id, searchParams } = params;

  const url = new URL(`${baseUrl}/id/${id}/themes`);

  Object.entries(searchParams)
    .map(([key, value]) => ({ key, value }))
    .forEach((p) => url.searchParams.append(p.key, p.value.toString()));

  const response = await axios.get<ThemesPage>(url.href);
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

async function deleteDictionaryById(id: string) {
  const response = await axios.delete(`${baseUrl}/id/${id}`);
  return response.data;
}

export {
  createDictionary,
  getDictionaries,
  getThemesByDictionaryId,
  getDictionaryById,
  updateDictionaryById,
  deleteDictionaryById,
};
