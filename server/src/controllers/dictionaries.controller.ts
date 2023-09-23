import DictionaryModel from "../models/dictionary.model";
import { Request, Response } from "express";
import {
  DictionaryCreateValidationSchema,
  DictionaryGetValidationSchema,
} from "../validations/dictionary.validation";

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

  let query = DictionaryModel.find({});
  if (populateThemes) {
    let options = populateThemesLimit
      ? { path: "themes", options: { limit: populateThemesLimit } }
      : { path: "themes" };

    query = query.populate(options);
  }

  const dictionaries = await query.exec();

  return res.status(200).json(dictionaries);
}

const DictionariesController = {
  create,
  get,
};

export default DictionariesController;
