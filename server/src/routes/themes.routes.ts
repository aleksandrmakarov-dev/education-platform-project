import express from "express";
import ThemesController from "../controllers/themes.controller";

const ThemesRouter = express.Router();

ThemesRouter.post("/", ThemesController.create);

export default ThemesRouter;
