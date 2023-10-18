import AuthConfig from "../config/auth.config";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import dayjs from "dayjs";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

function signAccessToken(payload: any) {
  return jsonwebtoken.sign(payload, AuthConfig.TOKEN_SECRET, {
    expiresIn: AuthConfig.ACCESS_TOKEN_EXPIRES,
  });
}

function verifyAccessToken(token: string) {
  return jsonwebtoken.verify(token, AuthConfig.TOKEN_SECRET);
}

function userToAccessToken(user: any) {
  return signAccessToken({ id: user.id, roles: user.roles });
}

function getExpirationTimeUnix(seconds: number) {
  return dayjs().add(seconds, "seconds").unix();
}

function isExpired(date: number | Date) {
  return dayjs().isBefore(date);
}

export {
  generateToken,
  signAccessToken,
  verifyAccessToken,
  userToAccessToken,
  getExpirationTimeUnix,
  isExpired,
};
