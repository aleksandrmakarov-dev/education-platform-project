import express from "express";
import ThemesController from "../controllers/themes.controller";

const ThemesRouter = express.Router();

ThemesRouter.post("/", ThemesController.create);
ThemesRouter.get("/id/:identifier/words", ThemesController.getWordsByThemeId);
ThemesRouter.get("/id/:identifier", ThemesController.getById);
ThemesRouter.get("/slug/:identifier", ThemesController.getBySlug);
ThemesRouter.put("/id/:identifier", ThemesController.updateById);
ThemesRouter.delete("/id/:identifier", ThemesController.deleteById);

export default ThemesRouter;
