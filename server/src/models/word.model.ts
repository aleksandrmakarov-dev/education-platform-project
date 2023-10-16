import mongoose from "mongoose";
import ThemeModel from "./theme.model";

const WordSchema = new mongoose.Schema({
  text: { type: String, required: true },
  definition: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  textContext: { type: String },
  definitionContext: { type: String },
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
