import { z } from "zod";

export const WordFormSchema = z.object({
  text: z.string().nonempty(),
  definition: z.string().nonempty(),
  theme: z.string().nonempty(),
  image: z.string().optional(),
  textAudioUrl: z.string().optional(),
  definitionAudioUrl: z.string().optional(),
});

export type WordFormSchemaType = z.infer<typeof WordFormSchema>;
