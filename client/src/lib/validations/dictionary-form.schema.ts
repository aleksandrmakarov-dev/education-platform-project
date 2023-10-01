import { z } from "zod";

const DictionaryFormSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

export type DictionaryFormSchemaType = z.infer<typeof DictionaryFormSchema>;

const DictionaryDeleteFormSchema = z
  .object({
    value: z.string().nonempty(),
    input: z.string().nonempty(),
  })
  .refine((data) => data.value === data.input, {
    path: ["input"],
    message: "Invalid value",
  });

export type DictionaryDeleteFormSchemaType = z.infer<
  typeof DictionaryDeleteFormSchema
>;

export { DictionaryFormSchema, DictionaryDeleteFormSchema };
