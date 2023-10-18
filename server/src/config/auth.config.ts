import dotenv from "dotenv";

dotenv.config();

if (!process.env.TOKEN_SECRET)
  throw new Error("Environment variable TOKEN_SECRET is undefined");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!process.env.ACCESS_TOKEN_EXPIRES)
  throw new Error("Environment variable ACCESS_TOKEN_EXPIRES is undefined");
const ACCESS_TOKEN_EXPIRES = Number(process.env.ACCESS_TOKEN_EXPIRES);

if (!process.env.COOKIE_NAME_REFRESH_TOKEN)
  throw new Error(
    "Environment variable COOKIE_NAME_REFRESH_TOKEN is undefined"
  );
const COOKIE_NAME_REFRESH_TOKEN = process.env.COOKIE_NAME_REFRESH_TOKEN;

if (!process.env.COOKIE_NAME_ACCESS_TOKEN)
  throw new Error("Environment variable COOKIE_NAME_ACCESS_TOKEN is undefined");
const COOKIE_NAME_ACCESS_TOKEN = process.env.COOKIE_NAME_ACCESS_TOKEN;

if (!process.env.REFRESH_TOKEN_EXPIRES)
  throw new Error("Environment variableN REFRESH_TOKEN_EXPIRES is undefined");
const REFRESH_TOKEN_EXPIRES = Number(process.env.REFRESH_TOKEN_EXPIRES);

const ROLE_ADMIN = "admin";
const ROLE_USER = "user";
const DEFAULT_ADMIN_USER = "alexandr.makarov.2000@gmail.com";

const AuthConfig = {
  TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  COOKIE_NAME_ACCESS_TOKEN,
  COOKIE_NAME_REFRESH_TOKEN,
  ROLE_ADMIN,
  ROLE_USER,
  DEFAULT_ADMIN_USER,
};

export default AuthConfig;
