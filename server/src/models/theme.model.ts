import mongoose, { Model } from "mongoose";
import WordModel from "./word.model";

const mongooseSlugUpdater = require("mongoose-slug-updater");

const ThemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  createdAt: { type: Date, default: () => Date.now() },
  image: { type: String },
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

    await WordModel.deleteMany({
      theme: id,
    });

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
