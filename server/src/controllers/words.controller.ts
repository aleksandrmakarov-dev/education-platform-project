import { Request, Response } from "express";
import { WordCreateValidationSchema } from "../validations/word.validation";
import WordModel from "../models/word.model";
import { IdentifierValidationSchema } from "../validations/shared.validation";
import ThemeModel from "../models/theme.model";
import { NotFoundError } from "../utils/api-errors.utls";
import { Created, NoContent, Ok } from "../utils/express.utils";

async function create(req: Request, res: Response) {
  const { theme, ...body } = WordCreateValidationSchema.parse(req.body);

  const foundTheme = await ThemeModel.findById(theme);

  if (!foundTheme) {
    throw new NotFoundError(`theme with identifier "${theme} not found"`);
  }

  const createdWord = await WordModel.create({
    ...body,
    theme: foundTheme._id,
    createdAt: Date.now(),
  });

  foundTheme.words.push(createdWord._id);
  await foundTheme.save();

  return Created(res, createdWord);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const body = WordCreateValidationSchema.parse(req.body);

  const updatedWord = await WordModel.findByIdAndUpdate(identifier, body, {
    returnDocument: "after",
    new: true,
  });

  if (!updatedWord) {
    throw new NotFoundError(`word with identifier "${identifier}" not found`);
  }

  return Ok(res, updatedWord);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { deletedCount } = await WordModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    throw new NotFoundError(`word with identifier "${identifier}" not found`);
  }

  return NoContent(res);
}

const WordsController = {
  create,
  updateById,
  deleteById,
};

export default WordsController;
