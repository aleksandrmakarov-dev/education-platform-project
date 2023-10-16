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
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import DictionaryForm from "../../forms/dictionary/DictionaryForm";
import DictionaryService from "../../../services/dictionaries.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import { queryNames } from "../../../lib/constants";

interface UpdateDictionaryDialogProps {
  trigger: JSX.Element;
  dictionary?: Dictionary;
}

const UpdateDictionaryDialog: React.FC<UpdateDictionaryDialogProps> = ({
  trigger,
  dictionary,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);
  const { push } = useSnackbar();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: DictionaryService.updateById,
  });

  const { control, handleSubmit, reset } = useForm<DictionaryFormSchemaType>({
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
        identifier: dictionary.id,
        body: values,
      });
      reset();
      dialogRef.current?.close();

      push({ message: "Dictionary updated successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.dictionary.list]);
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
      <DictionaryForm control={control} />
    </DialogFormBase>
  );
};

export default UpdateDictionaryDialog;
