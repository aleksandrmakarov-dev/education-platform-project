import { Request, Response } from "express";
import { WordCreateValidationSchema } from "../validations/word.validation";
import WordModel from "../models/word.model";
import { IdentifierValidationSchema } from "../validations/shared.validation";
import ThemeModel from "../models/theme.model";
import { InternalError, NotFoundError } from "../utils/api-errors.utls";
import { Created, NoContent, Ok } from "../utils/express.utils";
import TextToSpeechService from "../services/text-to-speech.service";
import FileSystemService from "../services/filesystem.service";

async function create(req: Request, res: Response) {
  const { theme, image, ...body } = WordCreateValidationSchema.parse(req.body);

  const foundTheme = await ThemeModel.findById(theme);

  if (!foundTheme) {
    throw new NotFoundError(`theme with identifier "${theme} not found"`);
  }

  const uploadFilesPath = `/themes/${foundTheme._id}`;

  const textAudioUrl =
    await TextToSpeechService.createAudioAndUploadToCloudinary(
      body.text,
      foundTheme.languageFrom,
      uploadFilesPath
    );

  const definitionAudioUrl =
    await TextToSpeechService.createAudioAndUploadToCloudinary(
      body.definition,
      foundTheme.languageTo,
      uploadFilesPath
    );

  let newImageUrl = image;
  if (image) {
    newImageUrl = await FileSystemService.moveResource(
      image,
      uploadFilesPath,
      "image"
    );
  }

  const createdWord = await WordModel.create({
    ...body,
    image: newImageUrl,
    theme: foundTheme._id,
    createdAt: Date.now(),
    textAudioUrl: textAudioUrl,
    definitionAudioUrl: definitionAudioUrl,
  });

  foundTheme.words.push(createdWord._id);
  await foundTheme.save();

  return Created(res, createdWord);
}

async function updateById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);
  const { image, ...body } = WordCreateValidationSchema.parse(req.body);

  const foundWord = await WordModel.findById(identifier);

  if (!foundWord) {
    throw new NotFoundError(`word with identifier "${identifier}" not found`);
  }

  const foundTheme = await ThemeModel.findById(body.theme);

  if (!foundTheme) {
    throw new NotFoundError(`theme with identifier "${body.theme}" not found`);
  }

  let textAudioUrl: string = foundWord.textAudioUrl;
  let definitionAudioUrl: string = foundWord.definitionAudioUrl;

  const uploadFilesPath = `/themes/${foundTheme._id}`;

  const textHasChanged = foundWord.text !== body.text;
  if (textHasChanged) {
    textAudioUrl = await TextToSpeechService.createAudioAndUploadToCloudinary(
      body.text,
      foundTheme.languageFrom,
      uploadFilesPath
    );
  }

  const definitionHasChanged = foundWord.definition !== body.definition;
  if (definitionHasChanged) {
    definitionAudioUrl =
      await TextToSpeechService.createAudioAndUploadToCloudinary(
        body.definition,
        foundTheme.languageTo,
        uploadFilesPath
      );
  }

  let newImageUrl = image;
  const imageHasChanged = foundWord.image !== newImageUrl;

  if (imageHasChanged && newImageUrl) {
    newImageUrl = await FileSystemService.moveResource(
      newImageUrl,
      uploadFilesPath,
      "image"
    );
  }

  const updatedWord = await WordModel.findByIdAndUpdate(
    identifier,
    {
      ...body,
      image: newImageUrl,
      textAudioUrl: textAudioUrl,
      definitionAudioUrl: definitionAudioUrl,
    },
    {
      returnDocument: "after",
      new: true,
    }
  );

  let audioUrls = [];
  if (textHasChanged) {
    audioUrls.push(foundWord.textAudioUrl);
  }
  if (definitionHasChanged) {
    audioUrls.push(foundWord.definitionAudioUrl);
  }

  if (audioUrls.length > 0) {
    const deletedAudiosCount = await FileSystemService.deleteResources(
      audioUrls,
      "video"
    );

    if (deletedAudiosCount !== audioUrls.length) {
      throw new InternalError("some audio files were not deleted");
    }
  }

  if (imageHasChanged) {
    const imageUrls = [foundWord.image];
    const deletedImagesCount = await FileSystemService.deleteResources(
      imageUrls,
      "image"
    );

    if (deletedImagesCount !== imageUrls.length) {
      throw new InternalError("some image files were not deleted");
    }
  }

  return Ok(res, updatedWord);
}

async function deleteById(req: Request, res: Response) {
  const { identifier } = IdentifierValidationSchema.parse(req.params);

  const deletedWord = await WordModel.deleteOne({ _id: identifier });

  if (!deletedWord) {
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
