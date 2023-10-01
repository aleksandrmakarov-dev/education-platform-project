import express from "express";
import FileSystemController from "../controllers/filesystem.controller";

const FileSystemRouter = express.Router();

FileSystemRouter.post("/sign", FileSystemController.sign);

export default FileSystemRouter;
