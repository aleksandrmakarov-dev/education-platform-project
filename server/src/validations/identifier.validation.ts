import { z } from "zod";

const IdentifierValidationSchema = z.object({
  identifier: z.string().nonempty(),
});

export default IdentifierValidationSchema;
