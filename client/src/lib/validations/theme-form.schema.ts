import { z } from "zod";

const ThemeFormSchema = z.object({
  name: z.string().nonempty().min(5).max(50),
  description: z.string().max(100),
});

export type ThemeFormSchemaType = z.infer<typeof ThemeFormSchema>;

export { ThemeFormSchema };
