import axios from "axios";
import { SearchParams, Theme, Word } from "../lib/types";
import BaseService, { PageResult, appendSearchParams } from "./base.service";
import { ThemeFormSchemaType } from "../lib/validations/theme-form.schema";

const baseUrl = "http://localhost:3000/api/themes";

const baseServiceFunctions = BaseService<ThemeFormSchemaType, Theme>(baseUrl);

async function getWordsByThemeId(params: {
  identifier: string;
  searchParams?: SearchParams;
}) {
  const { identifier, searchParams } = params;

  const url = new URL(`${baseUrl}/id/${identifier}/words`);

  appendSearchParams(url, searchParams);

  const response = await axios.get<PageResult<Word>>(url.href);

  //await wait<boolean>(2000, true);

  return response.data;
}

const ThemesService = { ...baseServiceFunctions, getWordsByThemeId };

export default ThemesService;
