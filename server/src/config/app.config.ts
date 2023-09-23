import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT)
  throw new Error("Environment variable PORT is undefined");
const PORT = Number(process.env.PORT);

if (!process.env.MONGODB_URI)
  throw new Error("Environment variable MONGODB_URI is undefined");
const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.PUBLIC_URL)
  throw new Error("Environment variable PUBLIC_URL is undefined");
const PUBLIC_URL = process.env.PUBLIC_URL;

if (!process.env.SERVER_URL)
  throw new Error("Environment variable SERVER_URL is undefined");
const SERVER_URL = process.env.SERVER_URL;

const AppConfig = {
  PORT,
  MONGODB_URI,
  PUBLIC_URL,
  SERVER_URL,
};

export default AppConfig;
