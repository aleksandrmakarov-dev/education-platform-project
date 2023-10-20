import mongoose from "mongoose";
import WordModel from "./word.model";
import DictionaryModel from "./dictionary.model";
import FileSystemService from "../services/filesystem.service";

const mongooseSlugUpdater = require("mongoose-slug-updater");

const ThemeSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  createdAt: { type: Date, default: () => Date.now() },
  image: { type: String },
  languageFrom: { type: String, required: true },
  languageTo: { type: String, required: true },
  dictionary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dictionary",
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
});

ThemeSchema.plugin(mongooseSlugUpdater);

ThemeSchema.pre(["deleteOne"], async function (this: any, next) {
  try {
    const id = this.getFilter()["_id"];

    const foundTheme = await ThemeModel.findById(id);

    if (!foundTheme) {
      next();
    }

    const words = await WordModel.find({ theme: id });

    if (words.length > 0) {
      await Promise.all(
        words.map((word) => WordModel.deleteOne({ _id: word._id }))
      );
    }

    await DictionaryModel.findByIdAndUpdate(foundTheme.dictionary, {
      $pull: { themes: foundTheme._id },
    });

    //delete images and audios of words
    await FileSystemService.deleteFolder(`/themes/${id}`);

    //delete preview of theme
    if (foundTheme.image) {
      await FileSystemService.deleteResources([foundTheme.image], "image");
    }

    // Call the next middleware
    next();
  } catch (error) {
    next(error);
  }
});

ThemeSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj._id;
    delete returnObj.__v;
  },
});

const ThemeModel =
  mongoose.models.Theme || mongoose.model("Theme", ThemeSchema);

export default ThemeModel;
