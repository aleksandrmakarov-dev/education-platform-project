import { Request, Response } from "express";
import { WordCreateValidationSchema } from "../validations/word.validation";
import WordModel from "../models/word.model";
import { IdentifierValidationSchema } from "../validations/shared.validation";
import ThemeModel from "../models/theme.model";

async function create(req: Request, res: Response) {
  const body = WordCreateValidationSchema.parse(req.body);

  const foundTheme = await ThemeModel.findById(body.theme);

  if (!foundTheme) {
    return res.status(404).json({ message: "Theme not found" });
  }

  const createdWord = await WordModel.create({
    ...body,
    createdAt: Date.now(),
  });

  foundTheme.words.push(createdWord._id);
  await foundTheme.save();

  return res.status(201).json(createdWord);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const body = WordCreateValidationSchema.parse(req.body);

  const updatedWord = await WordModel.findByIdAndUpdate(identifier, body, {
    returnDocument: "after",
    new: true,
  });

  if (!updatedWord) {
    return res.status(404).json({ message: "tern not found" });
  }

  return res.status(200).json(updatedWord);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { deletedCount } = await WordModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    return res.status(404).json({ message: "Word not found" });
  }

  return res.status(204).end();
}

const WordsController = {
  create,
  updateById,
  deleteById,
};

export default WordsController;
