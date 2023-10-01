import { z } from "zod";

const SearchValidationSchema = z.object({
  searchQuery: z.string().optional(),
});

export type SearchValidationSchemaType = z.infer<typeof SearchValidationSchema>;

export { SearchValidationSchema };
