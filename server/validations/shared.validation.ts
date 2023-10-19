import { z } from "zod";

const IdentifierValidationSchema = z.object({
  identifier: z.string().nonempty(),
});

const SearchParamsValidationSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  searchQuery: z.string().optional(),
});

export { IdentifierValidationSchema, SearchParamsValidationSchema };
