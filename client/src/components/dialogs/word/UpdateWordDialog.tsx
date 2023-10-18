import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Word } from "../../../lib/types";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import { useRef } from "react";
import WordsService from "../../../services/words.service";
import {
  WordFormSchema,
  WordFormSchemaType,
} from "../../../lib/validations/word-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogFormBase from "../base/DialogFormBase";
import WordForm from "../../forms/word/WordForm";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import { queryNames } from "../../../lib/constants";
import { PageResult } from "../../../services/base.service";

interface UpdateThemeDialogProps {
  trigger: JSX.Element;
  word?: Word;
}

const UpdateThemeDialog: React.FC<UpdateThemeDialogProps> = ({
  trigger,
  word,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: WordsService.updateById,
  });

  const defaultValues: WordFormSchemaType = {
    text: "",
    definition: "",
    theme: word?.theme ?? "",
    image: "",
  };

  const { control, handleSubmit, reset } = useForm<WordFormSchemaType>({
    resolver: zodResolver(WordFormSchema),
    defaultValues: defaultValues,
    values: word ? { ...word } : defaultValues,
  });

  const onSubmit = async (values: WordFormSchemaType): Promise<void> => {
    if (!word) {
      return;
    }

    try {
      const updatedWord = await mutateAsync({
        identifier: word.id,
        body: values,
      });

      reset();
      dialogRef.current?.close();

      const queryKey = [queryNames.word.list, word.theme];
      const previousData = queryClient.getQueryData<PageResult<Word>>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousData,
        items: previousData?.items.map((item) =>
          item.id === updatedWord.id ? updatedWord : item
        ),
      });

      push({ message: "Word updated successfully", type: "success" });
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
      trigger={trigger}
      title="Update word"
      onSubmit={handleSubmit(onSubmit)}
      reset={() => reset()}
      isBusy={isLoading}
      ref={dialogRef}
    >
      <WordForm control={control} />
    </DialogFormBase>
  );
};

export default UpdateThemeDialog;
