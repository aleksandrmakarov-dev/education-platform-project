import React from "react";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryFormDialog from "./DictionaryFormDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDictionary } from "../../../services/dictionaries.service";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import { Dictionary } from "../../../lib/constants";

interface DictionaryCreateFormDialogProps {
  trigger?: any;
}

const DictionaryCreateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryCreateFormDialogProps
> = ({ trigger }, ref) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createDictionary,
  });

  const onCreateDictionary = async (values: DictionaryFormSchemaType) => {
    try {
      const createdDictionary = await createMutation.mutateAsync(values);

      queryClient.cancelQueries(["dictionaries-list"]);

      const previousData = queryClient.getQueryData<Dictionary[]>([
        "dictionaries-list",
      ]);

      queryClient.setQueriesData(
        ["dictionaries-list"],
        previousData
          ? [createdDictionary, ...previousData]
          : [createdDictionary]
      );

      return true;
    } catch (error: any) {
      console.log("create dictionary error:", error);
      return false;
    }
  };

  return (
    <DictionaryFormDialog
      ref={ref}
      trigger={trigger}
      title={"Create Dictionary"}
      onSubmitCallback={onCreateDictionary}
    />
  );
};

export default React.forwardRef(DictionaryCreateFormDialog);
