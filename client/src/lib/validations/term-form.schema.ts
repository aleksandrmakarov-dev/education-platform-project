import { z } from "zod";

const TermFormSchema = z.object({
  title: z.string().nonempty().min(5).max(50),
});

export type TermFormSchemaType = z.infer<typeof TermFormSchema>;
