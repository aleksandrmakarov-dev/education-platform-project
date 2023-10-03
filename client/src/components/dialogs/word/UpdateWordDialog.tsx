import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Word } from "../../../lib/types";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import { useRef } from "react";
import WordsService from "../../../services/words.service";
import {
  WordFormSchema,
  WordFormSchemaType,
} from "../../../lib/validations/word-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeFormSchemaType } from "../../../lib/validations/theme-form.schema";
import ThemeForm from "../../forms/theme/ThemeForm";
import DialogFormBase from "../base/DialogFormBase";
import WordForm from "../../forms/word/WordForm";

interface UpdateThemeDialogProps {
  trigger: JSX.Element;
  word?: Word;
}

const UpdateThemeDialog: React.FC<UpdateThemeDialogProps> = ({
  trigger,
  word,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: WordsService.updateById,
  });

  const defaultValues: WordFormSchemaType = {
    text: "",
    translation: "",
    theme: "",
    image: "",
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
      reset();
      dialogRef.current?.close();
      await mutateAsync({ id: word.id, body: values });

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

      queryClient.invalidateQueries(["words"]);
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
