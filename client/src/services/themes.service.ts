import axios from "axios";
import { Theme } from "../lib/types";
import { ThemeFormSchemaType } from "../lib/validations/theme-form.schema";

const baseUrl = "http://localhost:3000/api/themes";

async function createTheme(values: ThemeFormSchemaType): Promise<Theme> {
  const response = await axios.post(baseUrl, values);
  return response.data;
}

async function updateThemeById(params: {
  id: string;
  body: ThemeFormSchemaType;
}): Promise<Theme> {
  const response = await axios.put<Theme>(
    `${baseUrl}/id/${params.id}`,
    params.body
  );
  return response.data;
}

async function deleteThemeById(id: string) {
  const response = await axios.delete(`${baseUrl}/id/${id}`);
  return response.data;
}

export { createTheme, updateThemeById, deleteThemeById };
