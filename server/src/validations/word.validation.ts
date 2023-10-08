import { z } from "zod";

const WordCreateValidationSchema = z.object({
  text: z.string().nonempty(),
  definition: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
  textContext: z.string().optional(),
  definitionContext: z.string().optional(),
});

const WordUpdateValidationSchema = z.object({
  text: z.string().nonempty(),
  definition: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
  textContext: z.string().optional(),
  definitionContext: z.string().optional(),
});

export { WordCreateValidationSchema, WordUpdateValidationSchema };
