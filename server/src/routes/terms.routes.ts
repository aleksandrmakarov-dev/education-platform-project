import express from "express";
import TermsController from "../controllers/terms.controller";

const TermsRouter = express.Router();

TermsRouter.post("/", TermsController.create);
TermsRouter.put("/id/:identifier", TermsController.updateById);
TermsRouter.delete("/id/:identifier", TermsController.deleteById);

export default TermsRouter;
