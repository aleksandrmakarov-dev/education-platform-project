import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME)
  throw new Error("Environment variable CLOUDINARY_CLOUD_NAME is undefined");
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

if (!process.env.CLOUDINARY_API_KEY)
  throw new Error("Environment variable CLOUDINARY_API_KEY is undefined");
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

if (!process.env.CLOUDINARY_API_SECRET)
  throw new Error("Environment variable CLOUDINARY_API_SECRET is undefined");
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!process.env.FILESYSTEM_ROOT)
  throw new Error("Environment variable FILESYSTEM_ROOT is undefined");
const FILESYSTEM_ROOT = process.env.FILESYSTEM_ROOT;

const CloudinaryConfig = {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  FILESYSTEM_ROOT,
};

export function cloudinaryConfigure() {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export default CloudinaryConfig;
