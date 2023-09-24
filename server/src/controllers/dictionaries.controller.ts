import DictionaryModel from "../models/dictionary.model";
import { Request, Response } from "express";
import {
  DictionaryCreateValidationSchema,
  DictionaryGetValidationSchema,
  DictionaryUpdateValidationSchema,
} from "../validations/dictionary.validation";
import IdentifierValidationSchema from "../validations/identifier.validation";
import ThemeModel from "../models/theme.model";

async function create(req: Request, res: Response) {
  const { title } = DictionaryCreateValidationSchema.parse(req.body);

  const createdDictionary = await DictionaryModel.create({
    title: title,
    createdAt: Date.now(),
  });

  return res.status(201).json(createdDictionary);
}

async function get(req: Request, res: Response) {
  const { populateThemes, populateThemesLimit } =
    DictionaryGetValidationSchema.parse(req.query);

  let query = DictionaryModel.find({}).sort({ createdAt: -1 });
  if (populateThemes) {
    let options = populateThemesLimit
      ? { path: "themes", options: { limit: populateThemesLimit } }
      : { path: "themes" };

    query = query.populate(options);
  }

  const dictionaries = await query.exec();

  return res.status(200).json(dictionaries);
}

async function getThemesByParentId(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const themes = await ThemeModel.find({ dictionary: identifier });
  return res.status(200).json(themes);
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
    return res.status(404).json("dictionary not found");
  }

  return res.status(200).json(updatedDictionary);
}

const DictionariesController = {
  create,
  get,
  getThemesByParentId,
  getById,
  getBySlug,
  updateById,
};

export default DictionariesController;
