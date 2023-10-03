import { Request, Response } from "express";
import {
  ThemeCreateValidationSchema,
  ThemeUpdateValidationSchema,
} from "../validations/theme.validation";
import ThemeModel from "../models/theme.model";
import DictionaryModel from "../models/dictionary.model";
import WordModel from "../models/word.model";
import {
  IdentifierValidationSchema,
  SearchParamsValidationSchema,
} from "../validations/shared.validation";

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
  const { deletedCount } = await ThemeModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    return res.status(404).json({ message: "theme not found" });
  }

  return res.status(204).end();
}

async function getWordsByThemeId(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { page, limit, searchQuery } = SearchParamsValidationSchema.parse(
    req.query
  );

  const searchOptions = searchQuery
    ? {
        $and: [
          { dictionary: identifier },
          { title: { $regex: searchQuery, $options: "i" } },
        ],
      }
    : { dictionary: identifier };

  let query = WordModel.find(searchOptions).sort({ createdAt: -1 });

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const themes = await query.exec();

  const count = await WordModel.countDocuments(searchOptions).exec();

  const data = {
    items: themes,
    meta: {
      count: count,
    },
  };

  return res.status(200).json(data);
}

const ThemesController = {
  create,
  deleteById,
  updateById,
  getWordsByThemeId,
};

export default ThemesController;
