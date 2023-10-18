import express from "express";
import DictionariesController from "../controllers/dictionaries.controller";
import RoleBasedProtectionMiddleware from "../middlewares/role-based-protection.middleware";

const DictionariesRouter = express.Router();

DictionariesRouter.post(
  "/",
  RoleBasedProtectionMiddleware(["admin"]),
  DictionariesController.create
);
DictionariesRouter.get("/", DictionariesController.get);
DictionariesRouter.get(
  "/id/:identifier/themes",
  DictionariesController.getThemesByDictionaryId
);
DictionariesRouter.get("/id/:identifier", DictionariesController.getById);
DictionariesRouter.get("/slug/:identifier", DictionariesController.getBySlug);
DictionariesRouter.put(
  "/id/:identifier",
  RoleBasedProtectionMiddleware(["admin"]),
  DictionariesController.updateById
);
DictionariesRouter.delete(
  "/id/:identifier",
  RoleBasedProtectionMiddleware(["admin"]),
  DictionariesController.deleteById
);

export default DictionariesRouter;
