import mongoose from "mongoose";
import ThemeModel from "./theme.model";
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

DictionarySchema.pre(["deleteOne"], async function (this: any, next) {
  try {
    const id = this.getFilter()["_id"];
    //const dictionaryToDelete = await DictionaryModel.findOne({ _id: id });

    const themes = await ThemeModel.find({ dictionary: id });

    await Promise.all(
      themes.map((theme) => ThemeModel.deleteOne({ _id: theme._id }))
    );

    // Call the next middleware
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

DictionarySchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj._id;
    delete returnObj.__v;
  },
});

const DictionaryModel =
  mongoose.models.Dictionary || mongoose.model("Dictionary", DictionarySchema);

export default DictionaryModel;
