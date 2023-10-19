import { z } from "zod";

const DictionaryCreateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

const DictionaryUpdateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

export { DictionaryCreateValidationSchema, DictionaryUpdateValidationSchema };
