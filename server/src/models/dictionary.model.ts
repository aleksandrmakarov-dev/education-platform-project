import mongoose from "mongoose";
const mongooseSlugUpdater = require("mongoose-slug-updater");

const DictionarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
  createdAt: { type: Date, default: () => Date.now() },
  themes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
    },
  ],
});

DictionarySchema.plugin(mongooseSlugUpdater);

DictionarySchema.set("toJSON", {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj._id;
    delete returnObj.__v;
  },
});

const DictionaryModel =
  mongoose.models.Dictionary || mongoose.model("Dictionary", DictionarySchema);

export default DictionaryModel;
