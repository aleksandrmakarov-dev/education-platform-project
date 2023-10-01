import React, { useRef } from "react";
import DialogFormBase from "../DialogFormBase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../../lib/validations/dictionary-form.schema";
import DictionaryForm from "../../forms/dictionary/DictionaryForm";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDictionary } from "../../../services/dictionaries.service";

interface CreateDictionaryDialogProps {
  trigger: JSX.Element;
}

const CreateDictionaryDialog: React.FC<CreateDictionaryDialogProps> = ({
  trigger,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: createDictionary,
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

      // Instead of invalidation maybe use setQueryData ?
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
