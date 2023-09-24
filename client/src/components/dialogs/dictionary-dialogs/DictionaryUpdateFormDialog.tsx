import React from "react";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryFormDialog from "./DictionaryFormDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import { updateDictionaryById } from "../../../services/dictionaries.service";
import { Dictionary } from "../../../lib/constants";

interface DictionaryUpdateFormDialogProps {
  id: string;
  formValues: DictionaryFormSchemaType;
  trigger?: any;
}

const DictionaryUpdateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryUpdateFormDialogProps
> = ({ id, formValues, trigger }, ref) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateDictionaryById,
  });

  const onUpdateDictionary = async (values: DictionaryFormSchemaType) => {
    try {
      const updatedDictionary = await updateMutation.mutateAsync({
        id: id,
        body: values,
      });

      queryClient.cancelQueries(["dictionaries-list"]);

      const previousData = queryClient.getQueryData<Dictionary[]>([
        "dictionaries-list",
      ]);

      queryClient.setQueriesData(
        ["dictionaries-list"],
        previousData?.map((d) =>
          d.id === updatedDictionary.id
            ? { ...d, title: updatedDictionary.title }
            : d
        )
      );

      return true;
    } catch (error: any) {
      console.log("update dictionary error:", error);
      return false;
    }
  };

  return (
    <DictionaryFormDialog
      ref={ref}
      trigger={trigger}
      title={"Update Dictionary"}
      values={formValues}
      onSubmitCallback={onUpdateDictionary}
    />
  );
};

export default React.forwardRef(DictionaryUpdateFormDialog);
