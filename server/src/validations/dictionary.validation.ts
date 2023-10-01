import { z } from "zod";

const DictionaryCreateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

const DictionaryUpdateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

const DictionaryGetValidationSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  populateThemes: z.coerce.boolean().optional(),
  populateThemesLimit: z.coerce.number().optional(),
  searchQuery: z.string().optional(),
});

export {
  DictionaryCreateValidationSchema,
  DictionaryGetValidationSchema,
  DictionaryUpdateValidationSchema,
};
