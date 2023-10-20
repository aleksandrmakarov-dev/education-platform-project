import { Dictionary, SearchParams, Theme } from "../lib/types";
import { DictionaryFormSchemaType } from "../lib/validations/dictionary-form.schema";
import axios from "axios";
import BaseService, { PageResult } from "./base.service";
import { appendParams } from "../lib/utils";

const baseUrl = "/api/dictionaries";

const baseServiceFunctions = BaseService<DictionaryFormSchemaType, Dictionary>(
  baseUrl
);

async function getThemesByDictionaryId(params: {
  identifier: string;
  searchParams?: SearchParams;
}) {
  const { identifier, searchParams } = params;
  const url = appendParams(`${baseUrl}/id/${identifier}/themes`, searchParams);
  const response = await axios.get<PageResult<Theme>>(url);
  return response.data;
}

const DictionaryService = {
  ...baseServiceFunctions,
  getThemesByDictionaryId,
};

export default DictionaryService;
