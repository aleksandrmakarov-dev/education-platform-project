import DictionaryModel from "../models/dictionary.model";
import { Request, Response } from "express";
import {
  DictionaryCreateValidationSchema,
  DictionaryGetValidationSchema,
  DictionaryUpdateValidationSchema,
} from "../validations/dictionary.validation";
import IdentifierValidationSchema from "../validations/identifier.validation";
import ThemeModel from "../models/theme.model";
import { ThemeGetValidationSchema } from "../validations/theme.validation";

async function create(req: Request, res: Response) {
  const { title } = DictionaryCreateValidationSchema.parse(req.body);

  const createdDictionary = await DictionaryModel.create({
    title: title,
    createdAt: Date.now(),
  });

  return res.status(201).json(createdDictionary);
}

async function get(req: Request, res: Response) {
  const { page, limit, populateThemes, populateThemesLimit, searchQuery } =
    DictionaryGetValidationSchema.parse(req.query);

  const searchOptions = searchQuery
    ? { title: { $regex: searchQuery, $options: "i" } }
    : {};

  let query = DictionaryModel.find(searchOptions)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  if (populateThemes) {
    let options = populateThemesLimit
      ? { path: "themes", options: { limit: populateThemesLimit } }
      : { path: "themes" };

    query = query.populate(options);
  }

  const dictionaries = await query.exec();
  const count = await DictionaryModel.countDocuments(searchOptions).exec();

  const data = {
    items: dictionaries,
    meta: {
      count: count,
    },
  };

  return res.status(200).json(data);
}

async function getThemesByParentId(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { page, limit, searchQuery } = ThemeGetValidationSchema.parse(
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

  const themes = await ThemeModel.find(searchOptions)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const count = await ThemeModel.countDocuments(searchOptions).exec();

  const data = {
    items: themes,
    meta: {
      count: count,
    },
  };

  return res.status(200).json(data);
}

async function getById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const dictionary = await DictionaryModel.findOne({ _id: identifier });

  if (!dictionary) {
    return res.status(404).json("dictionary not found");
  }

  return res.status(200).json(dictionary);
}

async function getBySlug(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const dictionary = await DictionaryModel.findOne({ slug: identifier });

  if (!dictionary) {
    return res.status(404).json("dictionary not found");
  }

  return res.status(200).json(dictionary);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const { title } = DictionaryUpdateValidationSchema.parse(req.body);

  const updatedDictionary = await DictionaryModel.findByIdAndUpdate(
    identifier,
    {
      title: title,
    },
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
  const dictionaryToDelete = await DictionaryModel.findById(identifier);

  if (!dictionaryToDelete) {
    return res.status(404).json({ message: "dictionary not found" });
  }

  const { deletedCount } = await ThemeModel.deleteMany({
    _id: { $in: dictionaryToDelete.themes },
  });

  await DictionaryModel.findByIdAndDelete(identifier);

  return res.status(204).end();
}

const DictionariesController = {
  create,
  get,
  getThemesByParentId,
  getById,
  getBySlug,
  updateById,
  deleteById,
};

export default DictionariesController;
