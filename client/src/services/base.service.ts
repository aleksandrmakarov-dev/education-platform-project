import axios from "axios";
import { Meta, SearchParams } from "../lib/types";
import { wait } from "../lib/utils";

export interface PageResult<T> {
  items: T[];
  meta: Meta;
}

export function appendSearchParams(url: URL, searchParams: SearchParams) {
  Object.entries(searchParams)
    .map(([key, value]) => ({ key, value }))
    .forEach((p) => url.searchParams.append(p.key, p.value.toString()));
}

export default function BaseService<TForm, TReturn>(baseUrl: string) {
  return {
    create: async function (values: TForm): Promise<TReturn> {
      const response = await axios.post(baseUrl, values);
      return response.data;
    },
    getAll: async function (searchParams?: SearchParams) {
      const url = new URL(baseUrl);
      if (searchParams) {
        appendSearchParams(url, searchParams);
      }

      const response = await axios.get<PageResult<TReturn>>(url.href);
      await wait<boolean>(1000, true);
      return response.data;
    },
    getById: async function (id: string) {
      const response = await axios.get<TReturn>(`${baseUrl}/id/${id}`);
      return response.data;
    },
    updateById: async function (params: {
      id: string;
      body: TForm;
    }): Promise<TReturn> {
      const response = await axios.put<TReturn>(
        `${baseUrl}/id/${params.id}`,
        params.body
      );
      return response.data;
    },
    deleteById: async function (id: string) {
      const response = await axios.delete(`${baseUrl}/id/${id}`);
      return response.data;
    },
  };
}
