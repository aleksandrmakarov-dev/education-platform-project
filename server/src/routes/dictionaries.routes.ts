import express from "express";
import DictionariesController from "../controllers/dictionaries.controller";

const DictionariesRouter = express.Router();

DictionariesRouter.post("/", DictionariesController.create);
DictionariesRouter.get("/", DictionariesController.get);
DictionariesRouter.get(
  "/id/:identifier/themes",
  DictionariesController.getThemesByDictionaryId
);
DictionariesRouter.get("/id/:identifier", DictionariesController.getById);
DictionariesRouter.get("/slug/:identifier", DictionariesController.getBySlug);
DictionariesRouter.put("/id/:identifier", DictionariesController.updateById);
DictionariesRouter.delete("/id/:identifier", DictionariesController.deleteById);

export default DictionariesRouter;
