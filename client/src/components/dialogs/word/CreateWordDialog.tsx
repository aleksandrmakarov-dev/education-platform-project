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
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import { queryNames } from "../../../lib/constants";
import { Word } from "../../../lib/types";
import { PageResult } from "../../../services/base.service";

interface CreateWordDialogProps {
  trigger?: JSX.Element;
  theme: string;
}

const CreateWordDialog: React.FC<CreateWordDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: WordsService.create,
  });

  const defaultValues: WordFormSchemaType = {
    text: "",
    definition: "",
    theme: theme,
    image: "",
  };

  const { control, handleSubmit, reset } = useForm<WordFormSchemaType>({
    resolver: zodResolver(WordFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: WordFormSchemaType) => {
    try {
      const createdWord = await mutateAsync(values);
      reset();
      dialogRef.current?.close();

      const queryKey = [queryNames.word.list, theme];

      queryClient.cancelQueries(queryKey);
      const previousData = queryClient.getQueryData<PageResult<Word>>(queryKey);
      queryClient.setQueryData(queryKey, {
        items: [createdWord, ...(previousData?.items ?? [])],
        meta: {
          count: (previousData?.meta?.count ?? 0) + 1,
        },
      });

      push({ message: "Word created successfully", type: "success" });

      // Instead of invalidation maybe use setQueryData ?
      // queryClient.invalidateQueries([queryNames.word.list]);
    } catch (error: any) {
      console.log(error);
      push({
        title: error.message,
        message: error.response.data.error,
        type: "error",
      });
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
      <WordForm control={control} />
    </DialogFormBase>
  );
};

export default CreateWordDialog;
