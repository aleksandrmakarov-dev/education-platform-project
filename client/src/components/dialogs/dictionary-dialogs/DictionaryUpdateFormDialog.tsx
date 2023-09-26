import React from "react";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryFormDialog from "./DictionaryFormDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import { updateDictionaryById } from "../../../services/dictionaries.service";
import { Dictionary } from "../../../lib/constants";
import { useNavigate } from "react-router-dom";

interface DictionaryUpdateFormDialogProps {
  id: string;
  formValues: DictionaryFormSchemaType;
  trigger?: JSX.Element;
  redirectOnSuccess?: boolean;
}

const DictionaryUpdateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryUpdateFormDialogProps
> = ({ id, formValues, trigger, redirectOnSuccess }, ref) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateDictionaryById,
  });

  const navigate = useNavigate();

  const onUpdateDictionary = async (values: DictionaryFormSchemaType) => {
    try {
      return await updateMutation.mutateAsync({
        id: id,
        body: values,
      });
    } catch (error: any) {
      console.log("update dictionary error:", error);
      return undefined;
    }
  };

  const onAfterCreate = (value: Dictionary | undefined) => {
    if (redirectOnSuccess) {
      navigate(`/dictionaries/${value?.id}`);
    }

    queryClient.cancelQueries(["dictionaries-list"]);

    const previousData =
      queryClient.getQueryData<Dictionary[]>(["dictionaries-list"]) ?? [];

    queryClient.setQueriesData(
      ["dictionaries-list"],
      previousData.map((item) => (item.id === value?.id ? value : item))
    );
  };

  return (
    <DictionaryFormDialog
      ref={ref}
      trigger={trigger}
      title={"Update Dictionary"}
      values={formValues}
      onSubmitCallback={onUpdateDictionary}
      onDialogClose={onAfterCreate}
    />
  );
};

export default React.forwardRef(DictionaryUpdateFormDialog);
