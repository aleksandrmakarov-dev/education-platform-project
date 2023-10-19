import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: { type: String },
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  access_token: { type: String },
  revoked: { type: Date },
});

const AccountModel =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default AccountModel;
