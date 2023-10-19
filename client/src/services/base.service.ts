import axios from "axios";
import { Meta, SearchParams } from "../lib/types";
import { object } from "zod";
import { appendParams, objectToQueryString } from "../lib/utils";

export interface PageResult<T> {
  items: T[];
  meta: Meta;
}

export default function BaseService<TForm, TReturn>(baseUrl: string) {
  return {
    create: async function (values: TForm): Promise<TReturn> {
      const response = await axios.post(baseUrl, values);
      return response.data;
    },

    getAll: async function (searchParams?: SearchParams) {
      const url = appendParams(baseUrl, searchParams);

      const response = await axios.get<PageResult<TReturn>>(url);
      return response.data;
    },

    getById: async function (identifier: string) {
      const response = await axios.get<TReturn>(`${baseUrl}/id/${identifier}`);
      return response.data;
    },

    getBySlug: async function (identifier: string) {
      const response = await axios.get<TReturn>(
        `${baseUrl}/slug/${identifier}`
      );

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
      return response.data;
    },

    deleteById: async function (identifier: string) {
      const response = await axios.delete(`${baseUrl}/id/${identifier}`);
      return response.data;
    },
  };
}
