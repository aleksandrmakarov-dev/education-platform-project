import mongoose from "mongoose";
import TermModel from "./term.model";

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
  terms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Term",
    },
  ],
});

ThemeSchema.plugin(mongooseSlugUpdater);

ThemeSchema.post(["deleteMany", "deleteOne"], async (doc) => {
  await TermModel.deleteMany({
    _id: { $in: doc.terms },
  });
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
