import axios from "axios";
import { Meta, SearchParams } from "../lib/types";

export interface PageResult<T> {
  items: T[];
  meta: Meta;
}

export function appendSearchParams(url: URL, searchParams?: SearchParams) {
  if (!searchParams) {
    return;
  }

  Object.entries(searchParams)
    .map(([key, value]) => ({ key, value }))
    .forEach((p) => url.searchParams.append(p.key, p.value.toString()));
}

export default function BaseService<TForm, TReturn>(baseUrl: string) {
  return {
    create: async function (values: TForm): Promise<TReturn> {
      const response = await axios.post(baseUrl, values);
      //await wait<boolean>(2000, true);
      return response.data;
    },

    getAll: async function (searchParams?: SearchParams) {
      const url = new URL(baseUrl);
      appendSearchParams(url, searchParams);

      const response = await axios.get<PageResult<TReturn>>(url.href);
      //await wait<boolean>(2000, true);
      return response.data;
    },

    getById: async function (identifier: string) {
      const response = await axios.get<TReturn>(`${baseUrl}/id/${identifier}`);
      //await wait<boolean>(2000, true);
      return response.data;
    },

    getBySlug: async function (identifier: string) {
      const response = await axios.get<TReturn>(
        `${baseUrl}/slug/${identifier}`
      );

      //await wait<boolean>(2000, true);

      return response.data;
    },

    updateById: async function (params: {
      identifier: string;
      body: TForm;
    }): Promise<TReturn> {
      const response = await axios.put<TReturn>(
        `${baseUrl}/id/${params.identifier}`,
        params.body
      );
      //await wait<boolean>(2000, true);
      return response.data;
    },

    deleteById: async function (identifier: string) {
      const response = await axios.delete(`${baseUrl}/id/${identifier}`);
      //await wait<boolean>(2000, true);
      return response.data;
    },
  };
}
