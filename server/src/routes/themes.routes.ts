import express from "express";
import ThemesController from "../controllers/themes.controller";

const ThemesRouter = express.Router();

ThemesRouter.post("/", ThemesController.create);
ThemesRouter.delete("/id/:identifier", ThemesController.deleteById);
ThemesRouter.put("/id/:identifier", ThemesController.updateById);
ThemesRouter.get("/id/:identifier/themes", ThemesController.getWordsByThemeId);
ThemesRouter.get("/id/:identifier/words", ThemesController.getWordsByThemeId);
export default ThemesRouter;
