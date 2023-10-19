import axios from "axios";
import { SearchParams, Theme, Word } from "../lib/types";
import BaseService, { PageResult } from "./base.service";
import { ThemeFormSchemaType } from "../lib/validations/theme-form.schema";
import { appendParams } from "../lib/utils";

const baseUrl = `/api/themes`;

const baseServiceFunctions = BaseService<ThemeFormSchemaType, Theme>(baseUrl);

async function getWordsByThemeId(params: {
  identifier: string;
  searchParams?: SearchParams;
}) {
  const { identifier, searchParams } = params;

  const url = appendParams(`${baseUrl}/id/${identifier}/words`, searchParams);

  const response = await axios.get<PageResult<Word>>(url);

  //await wait<boolean>(2000, true);

  return response.data;
}

const ThemesService = { ...baseServiceFunctions, getWordsByThemeId };

export default ThemesService;
