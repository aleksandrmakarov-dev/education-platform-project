import express from "express";
import DictionariesController from "../controllers/dictionaries.controller";

const DictionariesRouter = express.Router();

DictionariesRouter.post("/", DictionariesController.create);
DictionariesRouter.get("/", DictionariesController.get);

export default DictionariesRouter;
