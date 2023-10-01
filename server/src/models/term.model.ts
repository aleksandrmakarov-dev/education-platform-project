import mongoose from "mongoose";

const TermSchema = new mongoose.Schema({
  text: { type: String, required: true },
  translation: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
  },
});

TermSchema.set("toJSON", {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj._id;
    delete returnObj.__v;
  },
});

const TermModel = mongoose.models.Term || mongoose.model("Term", TermSchema);

export default TermModel;
