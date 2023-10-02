import { Request, Response } from "express";
import { TermCreateValidationSchema } from "../validations/term.validation";
import TermModel from "../models/term.model";
import IdentifierValidationSchema from "../validations/identifier.validation";

async function create(req: Request, res: Response) {
  const body = TermCreateValidationSchema.parse(req.body);

  const createdTerm = await TermModel.create({
    ...body,
    createdAt: Date.now(),
  });

  return res.status(201).json(createdTerm);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const body = TermCreateValidationSchema.parse(req.body);

  const updatedTerm = await TermModel.findByIdAndUpdate(identifier, body, {
    returnDocument: "after",
    new: true,
  });

  if (!updatedTerm) {
    return res.status(404).json({ message: "tern not found" });
  }

  return res.status(200).json(updatedTerm);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { deletedCount } = await TermModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    return res.status(404).json({ message: "Term not found" });
  }

  return res.status(204).end();
}

const TermsController = {
  create,
  updateById,
  deleteById,
};

export default TermsController;
