import axios, { AxiosProgressEvent } from "axios";
import { SignData } from "../lib/types";

const baseUrl = "http://localhost:3000/api/filesystem";

async function getSignature(path?: string) {
  const body = path
    ? {
        path: path,
      }
    : {};

  const response = await axios.post<SignData>(`${baseUrl}/sign`, body);
  return response.data;
}

async function uploadFile(
  file: File | string,
  signData: SignData,
  onUploadProgress?: (e: AxiosProgressEvent) => void
) {
  const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", signData.apiKey);
  fd.append("timestamp", signData.timestamp.toString());
  fd.append("signature", signData.signature);
  fd.append("folder", signData.path);

  const response = await axios.post(url, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: onUploadProgress,
  });

  return response.data;
}

const FileSystemService = { getSignature, uploadFile };

export default FileSystemService;
