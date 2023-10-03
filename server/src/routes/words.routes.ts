import express from "express";
import WordsController from "../controllers/words.controller";

const WordsRouter = express.Router();

WordsRouter.post("/", WordsController.create);
WordsRouter.put("/id/:identifier", WordsController.updateById);
WordsRouter.delete("/id/:identifier", WordsController.deleteById);

export default WordsRouter;
