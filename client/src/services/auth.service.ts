import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "/api/auth";

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
};

async function refreshToken() {
  const response = await axios.post(
    `${baseUrl}/refresh-token`,
    {},
    axiosConfig
  );
  return response.data;
}

async function signOut() {
  const response = await axios.post(`${baseUrl}/sign-out`, {}, axiosConfig);
  return response.data;
}

async function signInWithGoogle() {
  const response = await axios.get(`${baseUrl}/sign-in/google`);
  return response.data;
}

export { refreshToken, signOut, signInWithGoogle };
