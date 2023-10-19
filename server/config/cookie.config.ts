import { CookieOptions } from "express";
import AuthConfig from "./auth.config";

const accessTokenCookieConfig: CookieOptions = {
  httpOnly: true,
  maxAge: AuthConfig.ACCESS_TOKEN_EXPIRES * 1000,
};

const refreshTokenCookieConfig: CookieOptions = {
  httpOnly: true,
  maxAge: AuthConfig.REFRESH_TOKEN_EXPIRES * 1000,
};

export { accessTokenCookieConfig, refreshTokenCookieConfig };
