import express from "express";
import WordsController from "../controllers/words.controller";
import RoleBasedProtectionMiddleware from "../middlewares/role-based-protection.middleware";

const WordsRouter = express.Router();

WordsRouter.post(
  "/",
  RoleBasedProtectionMiddleware(["admin"]),
  WordsController.create
);
WordsRouter.put("/id/:identifier", WordsController.updateById);
WordsRouter.delete(
  "/id/:identifier",
  RoleBasedProtectionMiddleware(["admin"]),
  WordsController.deleteById
);

export default WordsRouter;
