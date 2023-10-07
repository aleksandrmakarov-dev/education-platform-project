import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import WordForm from "../../forms/word/WordForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import WordsService from "../../../services/words.service";
import {
  WordFormSchema,
  WordFormSchemaType,
} from "../../../lib/validations/word-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import useSnackbar from "../../../hooks/useSnackbar";

interface CreateWordDialogProps {
  trigger: JSX.Element;
  theme: string;
}

const CreateWordDialog: React.FC<CreateWordDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: WordsService.create,
  });

  const defaultValues: WordFormSchemaType = {
    text: "",
    translation: "",
    theme: theme,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<WordFormSchemaType>({
    resolver: zodResolver(WordFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: WordFormSchemaType) => {
    try {
      await mutateAsync(values);
      reset();
      dialogRef.current?.close();

      push({ message: "Word created successfully", type: "success" });

      // Instead of invalidation maybe use setQueryData ?
      queryClient.invalidateQueries(["words"]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      title="Create word"
      trigger={trigger}
      onSubmit={handleSubmit(onSubmit)}
      ref={dialogRef}
      reset={() => reset()}
      isBusy={isLoading}
    >
      <WordForm
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
    </DialogFormBase>
  );
};

export default CreateWordDialog;
