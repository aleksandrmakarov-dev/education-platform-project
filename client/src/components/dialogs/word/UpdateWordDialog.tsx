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
    theme: "",
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
    values: word ? { ...word } : defaultValues,
  });

  const onSubmit = async (values: WordFormSchemaType) => {
    if (!word) {
      return;
    }

    try {
      await mutateAsync({ identifier: word.id, body: values });
      reset();
      dialogRef.current?.close();

      // queryClient.cancelQueries(["dictionaries"]);
      // const previousData = queryClient.getQueryData<Theme[]>([
      //   "dictionaries",
      // ]);
      // console.log(previousData);
      // queryClient.setQueryData(
      //   ["dictionaries"],
      //   previousData?.map((item) =>
      //     item.id === updatedTheme.id ? updatedTheme : item
      //   )
      // );

      // For some reason code above does not work (previous data undefined)

      push({ message: "Word updated successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.word.list]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      trigger={trigger}
      title="Update theme"
      onSubmit={handleSubmit(onSubmit)}
      reset={() => reset()}
      isBusy={isLoading}
      ref={dialogRef}
    >
      <WordForm
        setValue={setValue}
        register={register}
        errors={errors}
        getValues={getValues}
      />
    </DialogFormBase>
  );
};

export default UpdateThemeDialog;
