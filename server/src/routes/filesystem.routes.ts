import express from "express";
import FileSystemController from "../controllers/filesystem.controller";
import RoleBasedProtectionMiddleware from "../middlewares/role-based-protection.middleware";

const FileSystemRouter = express.Router();

FileSystemRouter.post(
  "/sign",
  RoleBasedProtectionMiddleware(["admin"]),
  FileSystemController.sign
);

export default FileSystemRouter;
