import { Request, Response } from "express";
import { ThemeCreateValidationSchema } from "../validations/theme.validation";
import ThemeModel from "../models/theme.model";
import DictionaryModel from "../models/dictionary.model";

async function create(req: Request, res: Response) {
  const { title, description, dictionary } = ThemeCreateValidationSchema.parse(
    req.body
  );

  const foundDictionary = await DictionaryModel.findById(dictionary);

  if (!foundDictionary) {
    return res.status(404).json({ message: "Dictionary not found" });
  }

  const createdTheme = await ThemeModel.create({
    title: title,
    description: description,
    dictionary: dictionary,
  });

  foundDictionary.themes.push(createdTheme._id);
  await foundDictionary.save();

  return res.status(201).json(createdTheme);
}

const ThemesController = {
  create,
};

export default ThemesController;
