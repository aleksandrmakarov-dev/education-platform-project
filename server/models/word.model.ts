import mongoose from "mongoose";
import ThemeModel from "./theme.model";
import FileSystemService from "../services/filesystem.service";

const WordSchema = new mongoose.Schema({
  text: { type: String, trim: true, required: true },
  definition: { type: String, trim: true, required: true },
  image: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  textAudioUrl: { type: String },
  definitionAudioUrl: { type: String },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
  },
});

// On deleteOne, delete all words that reference this theme
WordSchema.pre(["deleteOne"], async function (next) {
  const id = this.getFilter()["_id"];

  const foundWord = await WordModel.findById(id);

  // If word is not found, call the next middleware
  if (!foundWord) {
    next();
  }

  const audioUrls = [foundWord.textAudioUrl, foundWord.definitionAudioUrl];

  await FileSystemService.deleteResources(audioUrls, "video");

  const imageUrls = [foundWord.image];
  if (imageUrls) {
    await FileSystemService.deleteResources(imageUrls, "image");
  }

  // Remove word reference from themes
  await ThemeModel.findByIdAndUpdate(foundWord.theme, {
    $pull: { words: foundWord._id },
  });
});

WordSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj._id;
    delete returnObj.__v;
  },
});

const WordModel = mongoose.models.Word || mongoose.model("Word", WordSchema);

export default WordModel;
