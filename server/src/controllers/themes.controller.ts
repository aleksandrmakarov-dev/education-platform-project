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
import { TitleSearchOptions } from "../utils/mongoose.utils";
import { InternalError, NotFoundError } from "../utils/api-errors.utls";
import { NoContent, Ok } from "../utils/express.utils";
import FileSystemService from "../services/filesystem.service";

const uploadFilesPath = `/themes/previews`;

async function create(req: Request, res: Response) {
  const { dictionary, image, ...body } = ThemeCreateValidationSchema.parse(
    req.body
  );

  const foundDictionary = await DictionaryModel.findById(dictionary);

  if (!foundDictionary) {
    throw new NotFoundError(
      `dictionary with identifier "${dictionary}" not found`
    );
  }

  let newImageUrl = image;
  if (image) {
    newImageUrl = await FileSystemService.moveResource(
      image,
      uploadFilesPath,
      "image"
    );
  }

  const createdTheme = await ThemeModel.create({
    ...body,
    image: newImageUrl,
    dictionary: foundDictionary._id,
  });

  foundDictionary.themes.push(createdTheme._id);
  await foundDictionary.save();

  await FileSystemService.createFolder(`/themes/${createdTheme._id}`);

  return Ok(res, createdTheme);
}

async function getById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const foundTheme = await ThemeModel.findById(identifier);

  if (!foundTheme) {
    throw new NotFoundError(`theme with identifier "${identifier}" not found`);
  }

  return Ok(res, foundTheme);
}

async function getBySlug(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const themeDictionary = await ThemeModel.findOne({ slug: identifier });

  if (!themeDictionary) {
    throw new NotFoundError(`theme with identifier "${identifier}" not found`);
  }

  return Ok(res, themeDictionary);
}

async function getWordsByThemeId(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { page, limit, searchQuery } = SearchParamsValidationSchema.parse(
    req.query
  );

  const foundTheme = await ThemeModel.findById(identifier);

  if (!foundTheme) {
    throw new NotFoundError(`theme with identifier "${identifier}" not found`);
  }

  const searchOptions = {
    $and: [{ theme: foundTheme._id }, TitleSearchOptions(searchQuery)],
  };

  let query = WordModel.find(searchOptions).sort({ createdAt: -1 });

  if (page && limit) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const words = await query.exec();

  const count = await WordModel.countDocuments(searchOptions).exec();

  const data = {
    items: words,
    meta: {
      count: count,
    },
  };

  return Ok(res, data);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const { image, ...body } = ThemeUpdateValidationSchema.parse(req.body);

  const foundTheme = await ThemeModel.findById(identifier);

  let newImageUrl = image;
  const imageHasChanged = foundTheme.image !== newImageUrl;

  if (imageHasChanged && newImageUrl) {
    newImageUrl = await FileSystemService.moveResource(
      newImageUrl,
      uploadFilesPath,
      "image"
    );
  }

  const updatedTheme = await ThemeModel.findByIdAndUpdate(
    identifier,
    { ...body, image: newImageUrl },
    {
      returnDocument: "after",
      new: true,
    }
  );

  if (!updatedTheme) {
    throw new NotFoundError(`theme with identifier "${identifier}" not found`);
  }

  if (imageHasChanged) {
    const imageUrls = [foundTheme.image];
    const deletedImagesCount = await FileSystemService.deleteResources(
      imageUrls,
      "image"
    );

    if (deletedImagesCount !== imageUrls.length) {
      throw new InternalError("some image files were not deleted");
    }
  }

  return Ok(res, updatedTheme);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const { deletedCount } = await ThemeModel.deleteOne({ _id: identifier });

  if (deletedCount === 0) {
    throw new NotFoundError(`theme with identifier "${identifier}" not found`);
  }

  return NoContent(res);
}

const ThemesController = {
  create,
  getById,
  getBySlug,
  getWordsByThemeId,
  updateById,
  deleteById,
};

export default ThemesController;
