import AppConfig from "./app.config";

if (!process.env.GOOGLE_CLIENT_ID)
  throw new Error("Environment variableN GOOGLE_CLIENT_ID is undefined");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("Environment variableN GOOGLE_CLIENT_SECRET is undefined");
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GoogleOAuthConfig = {
  baseUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  userUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
  callbackUrl: `${AppConfig.PUBLIC_URL}/api/auth/callback/oauth/google`,
  clientSecret: GOOGLE_CLIENT_SECRET,
  client_id: GOOGLE_CLIENT_ID,
};

export default GoogleOAuthConfig;
