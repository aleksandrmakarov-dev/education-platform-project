import { z } from "zod";

const ThemeCreateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
  description: z.string().max(100),
  image: z.string().optional(),
  dictionary: z.string().nonempty(),
});

const ThemeUpdateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
  image: z.string().optional(),
  description: z.string().max(100),
});

export { ThemeCreateValidationSchema, ThemeUpdateValidationSchema };
