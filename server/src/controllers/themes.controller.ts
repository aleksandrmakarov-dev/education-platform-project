import { Request, Response } from "express";
import {
  ThemeCreateValidationSchema,
  ThemeUpdateValidationSchema,
} from "../validations/theme.validation";
import ThemeModel from "../models/theme.model";
import DictionaryModel from "../models/dictionary.model";
import IdentifierValidationSchema from "../validations/identifier.validation";

async function create(req: Request, res: Response) {
  const body = ThemeCreateValidationSchema.parse(req.body);

  const foundDictionary = await DictionaryModel.findById(body.dictionary);

  if (!foundDictionary) {
    return res.status(404).json({ message: "Dictionary not found" });
  }

  const createdTheme = await ThemeModel.create({ ...body });

  foundDictionary.themes.push(createdTheme._id);
  await foundDictionary.save();

  return res.status(201).json(createdTheme);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const body = ThemeUpdateValidationSchema.parse(req.body);

  const updatedDictionary = await ThemeModel.findByIdAndUpdate(
    identifier,
    { ...body },
    {
      returnDocument: "after",
      new: true,
    }
  );

  if (!updatedDictionary) {
    return res.status(404).json({ message: "dictionary not found" });
  }

  return res.status(200).json(updatedDictionary);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const deletedTheme = await ThemeModel.findByIdAndDelete(identifier);

  if (!deletedTheme) {
    return res.status(404).json({ message: "theme not found" });
  }

  await DictionaryModel.findByIdAndUpdate(deletedTheme.dictionary, {
    $pull: {
      themes: deletedTheme._id,
    },
  });

  return res.status(204).end();
}

const ThemesController = {
  create,
  deleteById,
  updateById,
};

export default ThemesController;
