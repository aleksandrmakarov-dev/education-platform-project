import DictionaryModel from "../models/dictionary.model";
import { Request, Response } from "express";
import {
  DictionaryCreateValidationSchema,
  DictionaryUpdateValidationSchema,
} from "../validations/dictionary.validation";
import ThemeModel from "../models/theme.model";
import {
  IdentifierValidationSchema,
  SearchParamsValidationSchema,
} from "../validations/shared.validation";
import { TitleSearchOptions } from "../utils/mongoose.utils";
import { Created, NoContent, Ok } from "../utils/express.utils";
import { NotFoundError } from "../utils/api-errors.utls";

async function create(req: Request, res: Response) {
  const body = DictionaryCreateValidationSchema.parse(req.body);

  const createdDictionary = await DictionaryModel.create({
    ...body,
    createdAt: Date.now(),
  });

  return Created(res, createdDictionary);
}

async function get(req: Request, res: Response) {
  const { page, limit, searchQuery } = SearchParamsValidationSchema.parse(
    req.query
  );

  const searchOptions = TitleSearchOptions(searchQuery);

  let query = DictionaryModel.find(searchOptions).sort({ createdAt: -1 });

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const dictionaries = await query.exec();
  const count = await DictionaryModel.countDocuments(searchOptions).exec();

  const data = {
    items: dictionaries,
    meta: {
      count: count,
    },
  };

  return Ok(res, data);
}

async function getById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const foundDictionary = await DictionaryModel.findById(identifier);

  if (!foundDictionary) {
    throw new NotFoundError(
      `dictionary with identifier "${identifier}" not found`
    );
  }

  return Ok(res, foundDictionary);
}

async function getBySlug(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const foundDictionary = await DictionaryModel.findOne({ slug: identifier });

  if (!foundDictionary) {
    throw new NotFoundError(
      `dictionary with identifier "${identifier}" not found`
    );
  }

  return Ok(res, foundDictionary);
}

async function getThemesByDictionaryId(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { page, limit, searchQuery } = SearchParamsValidationSchema.parse(
    req.query
  );
  const foundDictionary = await DictionaryModel.findById(identifier);

  if (!foundDictionary) {
    throw new NotFoundError(
      `dictionary with identifier "${identifier}" not found`
    );
  }

  const searchOptions = {
    $and: [
      { dictionary: foundDictionary._id },
      TitleSearchOptions(searchQuery),
    ],
  };

  let query = ThemeModel.find(searchOptions).sort({ createdAt: -1 });

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const themes = await query.exec();

  const count = await ThemeModel.countDocuments(searchOptions).exec();

  const data = {
    items: themes,
    meta: {
      count: count,
    },
  };

  return Ok(res, data);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const body = DictionaryUpdateValidationSchema.parse(req.body);

  const updatedDictionary = await DictionaryModel.findByIdAndUpdate(
    identifier,
    body,
    {
      returnDocument: "after",
      new: true,
    }
  );

  if (!updatedDictionary) {
    throw new NotFoundError(
      `dictionary with identifier "${identifier}" not found`
    );
  }

  return Ok(res, updatedDictionary);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { deletedCount } = await DictionaryModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    throw new NotFoundError(
      `dictionary with identifier "${identifier}" not found`
    );
  }

  return NoContent(res);
}

const DictionariesController = {
  create,
  get,
  getById,
  getBySlug,
  getThemesByDictionaryId,
  updateById,
  deleteById,
};

export default DictionariesController;
