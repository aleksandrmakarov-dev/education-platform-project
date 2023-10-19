import { Dictionary, SearchParams, Theme } from "../lib/types";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import axios from "axios";
import BaseService, { PageResult, appendSearchParams } from "./base.service";

const baseUrl = `${import.meta.env.VITE_PUBLIC_URL}/api/dictionaries`;

const baseServiceFunctions = BaseService<DictionaryFormSchemaType, Dictionary>(
  baseUrl
);

async function getThemesByDictionaryId(params: {
  identifier: string;
  searchParams?: SearchParams;
}) {
  const { identifier, searchParams } = params;

  const url = new URL(`${baseUrl}/id/${identifier}/themes`);
  appendSearchParams(url, searchParams);

  const response = await axios.get<PageResult<Theme>>(url.href);

  //await wait<boolean>(2000, true);

  return response.data;
}

const DictionaryService = {
  ...baseServiceFunctions,
  getThemesByDictionaryId,
};

export default DictionaryService;
