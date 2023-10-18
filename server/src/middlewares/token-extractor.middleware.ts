import { NextFunction, Request, Response } from "express";
import AuthConfig from "../config/auth.config";
import { verifyAccessToken } from "../utils/auth.utils";
import { User } from "../types/user.type";

export default function TokenExtractorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //  - Use only signedCookies
  //  - If signedCookies empty, skip
  if (!req.cookies) {
    console.log("no cookies");
    return next();
  }

  const accessToken = req.cookies[AuthConfig.COOKIE_NAME_ACCESS_TOKEN];

  if (!accessToken) {
    return next();
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.currentUser = payload as User;
  } catch (error: any) {}

  next();
}
