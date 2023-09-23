import mongoose from "mongoose";
import AppConfig from "../config/app.config";

export const connect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(AppConfig.MONGODB_URI);
  console.log("connection has been established");
};
