export type GoogleOAuthTokenRequest = {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
};

export type GoogleOAuthTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export type GoogleUserResponse = {
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
};
