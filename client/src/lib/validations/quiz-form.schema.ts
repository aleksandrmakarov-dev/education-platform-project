import { z } from "zod";

const QuizFormSchema = z.object({
  givenAnswer: z.string().nonempty(),
});

export type QuizFormSchemaType = z.infer<typeof QuizFormSchema>;

export default QuizFormSchema;
