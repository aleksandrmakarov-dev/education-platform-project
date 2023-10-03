import { z } from "zod";

const WordCreateValidationSchema = z.object({
  text: z.string().nonempty(),
  translation: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
  context: z.string().optional(),
  contextTranslation: z.string().optional(),
});

const WordUpdateValidationSchema = z.object({
  text: z.string().nonempty(),
  translation: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
  context: z.string().optional(),
  contextTranslation: z.string().optional(),
});

export { WordCreateValidationSchema, WordUpdateValidationSchema };
