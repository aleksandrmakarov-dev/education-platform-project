import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../../lib/validations/dictionary-form.schema";
import DictionaryForm from "../../forms/dictionary/DictionaryForm";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DialogFormBase from "../base/DialogFormBase";
import DictionaryService from "../../../services/dictionaries.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import { queryNames } from "../../../lib/constants";

interface CreateDictionaryDialogProps {
  trigger: JSX.Element;
}

const CreateDictionaryDialog: React.FC<CreateDictionaryDialogProps> = ({
  trigger,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);
  const { push } = useSnackbar();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: DictionaryService.create,
  });

  const { control, handleSubmit, reset } = useForm<DictionaryFormSchemaType>({
    resolver: zodResolver(DictionaryFormSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (values: DictionaryFormSchemaType) => {
    try {
      await mutateAsync(values);
      reset();
      dialogRef.current?.close();

      push({ message: "Dictionary created successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.dictionary.list]);
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
      title="Create dictionary"
      onSubmit={handleSubmit(onSubmit)}
      ref={dialogRef}
      reset={() => reset()}
      isBusy={isLoading}
    >
      <DictionaryForm control={control} />
    </DialogFormBase>
  );
};

export default CreateDictionaryDialog;
