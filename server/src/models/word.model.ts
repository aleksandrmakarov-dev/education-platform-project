import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  text: { type: String, required: true },
  definition: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  textContext: { type: String },
  definitionContext: { type: String },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
  },
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
