import express from "express";
import ThemesController from "../controllers/themes.controller";
import RoleBasedProtectionMiddleware from "../middlewares/role-based-protection.middleware";

const ThemesRouter = express.Router();

ThemesRouter.post(
  "/",
  RoleBasedProtectionMiddleware(["admin"]),
  ThemesController.create
);
ThemesRouter.get("/id/:identifier/words", ThemesController.getWordsByThemeId);
ThemesRouter.get("/id/:identifier", ThemesController.getById);
ThemesRouter.get("/slug/:identifier", ThemesController.getBySlug);
ThemesRouter.put(
  "/id/:identifier",
  RoleBasedProtectionMiddleware(["admin"]),
  ThemesController.updateById
);
ThemesRouter.delete(
  "/id/:identifier",
  RoleBasedProtectionMiddleware(["admin"]),
  ThemesController.deleteById
);

export default ThemesRouter;
