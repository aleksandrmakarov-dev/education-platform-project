import axios from "axios";
import cloudinary from "cloudinary";
import CloudinaryConfig from "../config/cloudinary.config";
import { extractPublicId } from "cloudinary-build-url";
import FormData from "form-data";

const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${CloudinaryConfig.CLOUDINARY_CLOUD_NAME}/auto`;

function signUploadForm(path?: string) {
  const fullPath = CloudinaryConfig.FILESYSTEM_ROOT + path;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: fullPath,
    },
    CloudinaryConfig.CLOUDINARY_API_SECRET
  );

  return { timestamp, signature, fullPath };
}

async function uploadResource(file: File | string, path: string) {
  if (!file) throw new Error("No file provided");

  const { signature, timestamp, fullPath } = signUploadForm(path);

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", CloudinaryConfig.CLOUDINARY_API_KEY);
  fd.append("timestamp", timestamp.toString());
  fd.append("signature", signature);
  fd.append("folder", fullPath);

  const response = await axios.post(`${cloudinaryUploadUrl}/upload`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

async function deleteResources(publicUrls: string[], resourceType: string) {
  const publicIds = publicUrls.map((url) => extractPublicId(url));
  const response = await cloudinary.v2.api.delete_resources(publicIds, {
    type: "upload",
    resource_type: resourceType,
  });
  return Object.keys(response.deleted).length;
}

async function deleteFolder(path: string) {
  const fullPath = `${CloudinaryConfig.FILESYSTEM_ROOT}${path}`;

  const deleteFolderResponse = await cloudinary.v2.api.delete_folder(fullPath);

  return deleteFolderResponse.deleted.length;
}

async function moveResource(
  publicUrl: string,
  newFolder: string,
  resourceType: string
) {
  const publicId = extractPublicId(publicUrl);

  const newPublicId = publicId.replace("/temp", newFolder);

  const { url } = await cloudinary.v2.uploader.rename(publicId, newPublicId, {
    resource_type: resourceType,
  });
  return url;
}

async function createFolder(path: string) {
  const fullPath = `${CloudinaryConfig.FILESYSTEM_ROOT}${path}`;
  return await cloudinary.v2.api.create_folder(fullPath);
}

const FileSystemService = {
  signUploadForm,
  uploadResource,
  deleteResources,
  moveResource,
  deleteFolder,
  createFolder,
};

export default FileSystemService;
