import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PracticeWriteCardProps {
  onAnswerGiven: (answer: string) => void;
}

const formSchema = z.object({
  givenAnswer: z.string().nonempty(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const PracticeWrite: React.FC<PracticeWriteCardProps> = ({ onAnswerGiven }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenAnswer: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    onAnswerGiven(values.givenAnswer);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Your answer"
        size="small"
        fullWidth
        {...register("givenAnswer")}
      />
      <div className="flex justify-end gap-2">
        <Button>Don't know?</Button>
        <Button variant="contained" disableElevation>
          Answer
        </Button>
      </div>
    </form>
  );
};

export default PracticeWrite;
