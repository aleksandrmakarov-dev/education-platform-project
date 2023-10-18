import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  passwordHash: { type: String },
  emailVerified: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date },
  roles: [
    {
      type: String,
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (_doc, returnObj) => {
    returnObj.id = returnObj._id.toString();

    delete returnObj.passwordHash;
    delete returnObj.__v;
    delete returnObj._id;
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
