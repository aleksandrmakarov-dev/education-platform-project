import { z } from "zod";

const ThemeCreateValidationSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
  description: z.string().max(100).optional(),
  dictionary: z.string().nonempty(),
});

export { ThemeCreateValidationSchema };
