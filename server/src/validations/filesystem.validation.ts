import { z } from "zod";

const SignValidationSchema = z.object({
  path: z.string().optional(),
});

export { SignValidationSchema };
