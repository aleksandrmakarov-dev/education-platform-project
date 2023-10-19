import { z } from "zod";

const RefreshTokenValidationSchema = z.object({
  token: z.string().nonempty(),
});

const GoogleOAuthCallbackValidationSchema = z.object({
  code: z.string().nonempty(),
  scope: z.string().nonempty(),
});

export { RefreshTokenValidationSchema, GoogleOAuthCallbackValidationSchema };
