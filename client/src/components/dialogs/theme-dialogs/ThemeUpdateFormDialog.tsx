import React from "react";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import ThemeFormDialog from "./ThemeFormDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Theme } from "../../../lib/constants";
import { ThemeFormSchemaType } from "../../../lib/validations/theme-form.schema";
import { updateThemeById } from "../../../services/themes.service";
import { redirect, useNavigation } from "react-router-dom";

interface ThemeUpdateFormDialogProps {
  id: string;
  formValues: ThemeFormSchemaType;
  trigger?: JSX.Element;
  redirectOnSuccess?: boolean;
}

const ThemeUpdateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  ThemeUpdateFormDialogProps
> = ({ id, formValues, trigger, redirectOnSuccess }, ref) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateThemeById,
  });

  const onUpdateTheme = async (values: ThemeFormSchemaType) => {
    try {
      return await updateMutation.mutateAsync({
        id: id,
        body: values,
      });
    } catch (error: any) {
      console.log("update Theme error:", error);
      return undefined;
    }
  };

  const onAfterUpdate = (value: Theme | undefined) => {
    if (redirectOnSuccess) {
      redirect(`/dictionaries/${formValues.dictionary}/themes/${value?.id}`);
    }
    queryClient.cancelQueries(["themes-list"]);

    const previousData =
      queryClient.getQueryData<Theme[]>(["themes-list"]) ?? [];

    queryClient.setQueriesData(
      ["themes-list"],
      previousData.map((item) => (item.id === value?.id ? value : item))
    );
  };

  return (
    <ThemeFormDialog
      ref={ref}
      trigger={trigger}
      title={"Update Theme"}
      values={formValues}
      onSubmitCallback={onUpdateTheme}
      onDialogClose={onAfterUpdate}
    />
  );
};

export default React.forwardRef(ThemeUpdateFormDialog);
