import { z } from "zod";

export const WordFormSchema = z.object({
  text: z.string().nonempty(),
  translation: z.string().nonempty(),
  theme: z.string().nonempty(),
  image: z.string().optional(),
  context: z.string().optional(),
  contextTranslation: z.string().optional(),
});

export type WordFormSchemaType = z.infer<typeof WordFormSchema>;
