import { z } from "zod";

const DictionaryFormSchema = z.object({
  name: z.string().nonempty().min(5).max(50),
});

export type DictionaryFormSchemaType = z.infer<typeof DictionaryFormSchema>;

export { DictionaryFormSchema };
