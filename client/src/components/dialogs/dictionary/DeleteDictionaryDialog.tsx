import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import { Dictionary } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DictionaryDeleteFormSchemaType,
  DictionaryDeleteFormSchema,
} from "../../../lib/validations/dictionary-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpenCloseHandle } from "../../../hooks/useImperativeDialog";
import DictionaryDeleteForm from "../../forms/dictionary/DictionaryDeleteForm";
import DictionaryService from "../../../services/dictionaries.service";
import useSnackbar from "../../../hooks/useSnackbar";
import { queryNames } from "../../../lib/constants";

interface DeleteDictionaryDialogProps {
  trigger: JSX.Element;
  dictionary?: Dictionary;
}

const DeleteDictionaryDialog: React.FC<DeleteDictionaryDialogProps> = ({
  trigger,
  dictionary,
}) => {
  const queryClient = useQueryClient();
  const dialogRef = useRef<OpenCloseHandle>(null);
  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: DictionaryService.deleteById,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DictionaryDeleteFormSchemaType>({
    resolver: zodResolver(DictionaryDeleteFormSchema),
    defaultValues: { value: "", input: "" },
    values: { value: dictionary?.slug ?? "", input: "" },
  });

  const onSubmit = async (values: DictionaryDeleteFormSchemaType) => {
    if (!dictionary) {
      return;
    }

    try {
      await mutateAsync(dictionary.id);

      reset();
      dialogRef.current?.close();

      push({ message: "Dictionary deleted successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.dictionary.list]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      trigger={trigger}
      title="Are you absolutely sure?"
      onSubmit={handleSubmit(onSubmit)}
      reset={() => reset()}
      isBusy={isLoading}
      ref={dialogRef}
      primaryBtnColor="error"
      primaryBtnLabel="Yes, delete dictionary"
      secondaryBtnLabel="Cancel, keep dictionary"
    >
      <div className="flex flex-col gap-1">
        <div className="bg-red-100 px-5 py-2.5 rounded-sm">
          <p className="font-semibold">
            You are about to delete this dictionary containing:
          </p>
          <ul className="list-inside list-disc">
            <li>{dictionary?.themes?.length} theme(s)</li>
          </ul>
          <p>This process deletes the dictionary and all related resources.</p>
        </div>
        <div className="flex flex-col items-start">
          <p>
            Enter the following to confirm:{" "}
            <span className="bg-gray-200 rounded-md font-semibold text-sm px-1 py-0.5">
              {dictionary?.slug}
            </span>
          </p>
        </div>
        <DictionaryDeleteForm register={register} errors={errors} />
      </div>
    </DialogFormBase>
  );
};

export default DeleteDictionaryDialog;
