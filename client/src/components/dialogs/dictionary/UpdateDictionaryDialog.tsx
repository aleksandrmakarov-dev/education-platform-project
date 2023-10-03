import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import { Dictionary } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DictionaryFormSchemaType,
  DictionaryFormSchema,
} from "../../../lib/validations/dictionary-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryForm from "../../forms/dictionary/DictionaryForm";
import DictionaryService from "../../../services/dictionaries.service";

interface UpdateDictionaryDialogProps {
  trigger: JSX.Element;
  dictionary?: Dictionary;
}

const UpdateDictionaryDialog: React.FC<UpdateDictionaryDialogProps> = ({
  trigger,
  dictionary,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: DictionaryService.updateById,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DictionaryFormSchemaType>({
    resolver: zodResolver(DictionaryFormSchema),
    defaultValues: { title: "" },
    values: { title: dictionary?.title ?? "" },
  });

  const onSubmit = async (values: DictionaryFormSchemaType) => {
    if (!dictionary) {
      return;
    }

    try {
      await mutateAsync({
        id: dictionary.id,
        body: values,
      });
      reset();
      dialogRef.current?.close();

      // queryClient.cancelQueries(["dictionaries"]);
      // const previousData = queryClient.getQueryData<Dictionary[]>([
      //   "dictionaries",
      // ]);
      // console.log(previousData);
      // queryClient.setQueryData(
      //   ["dictionaries"],
      //   previousData?.map((item) =>
      //     item.id === updatedDictionary.id ? updatedDictionary : item
      //   )
      // );

      // For some reason code above does not work (previous data undefined)

      queryClient.invalidateQueries(["dictionaries"]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      trigger={trigger}
      title="Update dictionary"
      onSubmit={handleSubmit(onSubmit)}
      reset={() => reset()}
      isBusy={isLoading}
      ref={dialogRef}
    >
      <DictionaryForm register={register} errors={errors} />
    </DialogFormBase>
  );
};

export default UpdateDictionaryDialog;
