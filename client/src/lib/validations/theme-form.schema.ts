import { z } from "zod";

const ThemeFormSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
  description: z.string().max(100),
  image: z.string().optional(),
  languageFrom: z.string().nonempty(),
  languageTo: z.string().nonempty(),
  dictionary: z.string().nonempty(),
});

export type ThemeFormSchemaType = z.infer<typeof ThemeFormSchema>;

export { ThemeFormSchema };
