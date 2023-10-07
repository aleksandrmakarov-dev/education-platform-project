import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../../lib/validations/dictionary-form.schema";
import DictionaryForm from "../../forms/dictionary/DictionaryForm";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DialogFormBase from "../base/DialogFormBase";
import DictionaryService from "../../../services/dictionaries.service";
import useSnackbar from "../../../hooks/useSnackbar";

interface CreateDictionaryDialogProps {
  trigger: JSX.Element;
}

const CreateDictionaryDialog: React.FC<CreateDictionaryDialogProps> = ({
  trigger,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);
  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: DictionaryService.create,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DictionaryFormSchemaType>({
    resolver: zodResolver(DictionaryFormSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (values: DictionaryFormSchemaType) => {
    try {
      await mutateAsync(values);
      reset();
      dialogRef.current?.close();

      push({ message: "Dictionary created successfully", type: "success" });

      queryClient.invalidateQueries(["dictionaries"]);
    } catch (error: any) {
      console.log(error);
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
      <DictionaryForm register={register} errors={errors} />
    </DialogFormBase>
  );
};

export default CreateDictionaryDialog;
