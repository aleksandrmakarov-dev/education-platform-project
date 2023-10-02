import { z } from "zod";

const TermCreateValidationSchema = z.object({
  text: z.string().nonempty(),
  translation: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
});

const TermUpdateValidationSchema = z.object({
  text: z.string().nonempty(),
  translation: z.string().nonempty(),
  image: z.string().optional(),
  theme: z.string().nonempty(),
});

const TermGetValidationSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  searchQuery: z.string().optional(),
});

export {
  TermCreateValidationSchema,
  TermUpdateValidationSchema,
  TermGetValidationSchema,
};
