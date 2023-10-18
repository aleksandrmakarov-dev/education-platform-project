import { Request, Response } from "express";
import CloudinaryConfig from "../config/cloudinary.config";
import { SignValidationSchema } from "../validations/filesystem.validation";
import FileSystemService from "../services/filesystem.service";

async function sign(req: Request, res: Response) {
  const { path } = SignValidationSchema.parse(req.body);

  const { timestamp, signature, fullPath } =
    FileSystemService.signUploadForm(path);

  const data = {
    signature: signature,
    timestamp: timestamp,
    cloudname: CloudinaryConfig.CLOUDINARY_CLOUD_NAME,
    apiKey: CloudinaryConfig.CLOUDINARY_API_KEY,
    path: fullPath,
  };

  return res.status(200).json(data);
}

const FileSystemController = {
  sign,
};

export default FileSystemController;
