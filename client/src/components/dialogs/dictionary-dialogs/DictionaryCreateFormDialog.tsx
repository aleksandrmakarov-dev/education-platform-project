import React, { useState } from "react";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryFormDialog from "./DictionaryFormDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDictionary } from "../../../services/dictionaries.service";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import { Dictionary } from "../../../lib/constants";
import { useNavigate } from "react-router-dom";

interface DictionaryCreateFormDialogProps {
  trigger?: any;
  redirectOnSuccess?: boolean;
}

const DictionaryCreateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryCreateFormDialogProps
> = ({ trigger, redirectOnSuccess }, ref) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createDictionary,
  });

  const navigate = useNavigate();

  const onCreateDictionary = async (values: DictionaryFormSchemaType) => {
    try {
      return await createMutation.mutateAsync(values);
    } catch (error: any) {
      console.log("create dictionary error:", error);
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

    queryClient.setQueriesData(["dictionaries-list"], [value, ...previousData]);
  };

  return (
    <DictionaryFormDialog
      ref={ref}
      trigger={trigger}
      title={"Create Dictionary"}
      onSubmitCallback={onCreateDictionary}
      onDialogClose={onAfterCreate}
    />
  );
};

export default React.forwardRef(DictionaryCreateFormDialog);
