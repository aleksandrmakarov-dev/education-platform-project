import axios from "axios";
import { SearchParams, Word } from "../lib/types";
import BaseService, { PageResult, appendSearchParams } from "./base.service";
import { wait } from "../lib/utils";

const baseUrl = "http://localhost:3000/api/themes";

const baseServiceFunctions = BaseService(baseUrl);

async function getWordsByThemeId(params: {
  id: string;
  searchParams?: SearchParams;
}) {
  const { id, searchParams } = params;

  const url = new URL(`${baseUrl}/id/${id}/words`);

  if (searchParams) {
    appendSearchParams(url, searchParams);
  }

  const response = await axios.get<PageResult<Word>>(url.href);
  await wait<boolean>(1000, true);
  return response.data;
}

const ThemesService = { ...baseServiceFunctions, getWordsByThemeId };

export default ThemesService;
