import cloudinary from "cloudinary";
import CloudinaryConfig from "../config/cloudinary.config";

const signUploadForm = (path: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: path,
    },
    CloudinaryConfig.CLOUDINARY_API_SECRET
  );

  return { timestamp, signature };
};

export { signUploadForm };
