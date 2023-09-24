import { z } from "zod";

const DictionaryFormSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

export type DictionaryFormSchemaType = z.infer<typeof DictionaryFormSchema>;

export { DictionaryFormSchema };
