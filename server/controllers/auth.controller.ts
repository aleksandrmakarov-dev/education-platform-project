import { Request, Response } from "express";
import axios from "axios";
import dayjs from "dayjs";
import AppConfig from "../config/app.config";
import AccountModel from "../models/account.model";
import UserModel from "../models/user.model";
import { UnAuthorizedError } from "../utils/api-errors.utls";
import AuthConfig from "../config/auth.config";
import {
  accessTokenCookieConfig,
  refreshTokenCookieConfig,
} from "../config/cookie.config";
import GoogleOAuthConfig from "../config/google.auth.config";
import {
  GoogleOAuthTokenRequest,
  GoogleOAuthTokenResponse,
  GoogleUserResponse,
} from "../types/auth.type";
import { userToAccessToken, getExpirationTimeUnix } from "../utils/auth.utils";
import { Ok } from "../utils/express.utils";
import { GoogleOAuthCallbackValidationSchema } from "../validations/auth.validation";

async function refreshToken(req: Request, res: Response) {
  if (!req.cookies) {
    throw new UnAuthorizedError("No cookies");
  }

  const refreshToken = req.cookies[AuthConfig.COOKIE_NAME_REFRESH_TOKEN];

  if (!refreshToken) {
    throw new UnAuthorizedError("Refresh token not found. Try sign in");
  }

  const account = await AccountModel.findOne({ refresh_token: refreshToken });

  if (!account) {
    throw new UnAuthorizedError("Account does not exist. Try sign in");
  }

  if (account.revoked) {
    throw new UnAuthorizedError("Refresh token has been revoked. Try sign in");
  }

  const now = Date.now();
  const expires = account.expires;
  const isExpired = dayjs(expires).isBefore(now);

  if (isExpired) {
    throw new UnAuthorizedError("Refresh token expired. Try sign in");
  }

  const user = await UserModel.findById(account.userId);

  if (!user) {
    throw new UnAuthorizedError("User associated with account not found");
  }

  const accessToken = userToAccessToken(user);

  // TODO:
  // - Implement refresh token rotation

  res.cookie(
    AuthConfig.COOKIE_NAME_ACCESS_TOKEN,
    accessToken,
    accessTokenCookieConfig
  );

  //  - Return all user's information for now..

  return Ok(res, user);
}

async function signOut(_req: Request, res: Response) {
  res.clearCookie(AuthConfig.COOKIE_NAME_ACCESS_TOKEN);
  res.clearCookie(AuthConfig.COOKIE_NAME_REFRESH_TOKEN);

  return Ok(res, {});
}

//  - Google OAuth

async function signInWithGoogle(_req: Request, res: Response) {
  const url = getGoogleOAuthUrl();
  return Ok(res, { redirect: url });
}

async function googleOAuthCallback(req: Request, res: Response) {
  const { code } = GoogleOAuthCallbackValidationSchema.parse(req.query);
  try {
    const googleTokenData = await getGoogleOAuthToken(code);
    const userData = await getGooogleUser(googleTokenData.access_token);

    //  - If email does not exist in database, create new user

    let user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      const defaultRole =
        userData.email === AuthConfig.DEFAULT_ADMIN_USER
          ? AuthConfig.ROLE_ADMIN
          : AuthConfig.ROLE_USER;

      user = await UserModel.create({
        name: userData.name,
        email: userData.email,
        image: userData.picture,
        emailVerified: userData.verified_email,
        roles: [defaultRole],
      });
    } else {
      user.name = userData.name;
      user.email = userData.email;
      user.image = userData.picture;

      user = await user.save();
    }

    const accessToken = userToAccessToken(user);

    //  - Create account

    const refreshTokenExpires = getExpirationTimeUnix(
      AuthConfig.REFRESH_TOKEN_EXPIRES
    );

    const createdAccount = await AccountModel.create({
      userId: user.id,
      type: googleTokenData.token_type,
      provider: "google",
      refresh_token: googleTokenData.refresh_token,
      expires_at: refreshTokenExpires,
      token_type: "Bearer",
      scope: googleTokenData.scope,
    });

    if (!createdAccount) {
      throw new Error("Failed to create account");
    }

    res.cookie(
      AuthConfig.COOKIE_NAME_ACCESS_TOKEN,
      accessToken,
      accessTokenCookieConfig
    );
    res.cookie(
      AuthConfig.COOKIE_NAME_REFRESH_TOKEN,
      googleTokenData.refresh_token,
      refreshTokenCookieConfig
    );

    return res.redirect(AppConfig.PUBLIC_URL);
  } catch (error: any) {
    return res.status(400).json();
  }
}

function getGoogleOAuthUrl() {
  const url = new URL(GoogleOAuthConfig.baseUrl);

  url.searchParams.append("client_id", GoogleOAuthConfig.client_id);
  url.searchParams.append("access_type", "offline");
  url.searchParams.append("prompt", "consent");
  url.searchParams.append("redirect_uri", GoogleOAuthConfig.callbackUrl);
  url.searchParams.append("response_type", "code");
  url.searchParams.append(
    "scope",
    [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ")
  );

  return url.toString();
}

async function getGoogleOAuthToken(code: string) {
  const body: GoogleOAuthTokenRequest = {
    code: code,
    client_id: GoogleOAuthConfig.client_id,
    client_secret: GoogleOAuthConfig.clientSecret,
    redirect_uri: GoogleOAuthConfig.callbackUrl,
    grant_type: "authorization_code",
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await axios.post<GoogleOAuthTokenResponse>(
    GoogleOAuthConfig.tokenUrl,
    body,
    config
  );

  return response.data;
}

async function getGooogleUser(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const url = new URL(GoogleOAuthConfig.userUrl);
  url.searchParams.append("alt", "json");

  const response = await axios.get<GoogleUserResponse>(
    `${GoogleOAuthConfig.userUrl}`,
    config
  );

  return response.data;
}

//

const AuthController = {
  refreshToken,
  signOut,
  signInWithGoogle,
  googleOAuthCallback,
};

export default AuthController;
