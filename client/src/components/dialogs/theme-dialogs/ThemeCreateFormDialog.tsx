import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import React from "react";
import { ThemeFormSchemaType } from "../../../lib/validations/theme-form.schema";
import ThemeFormDialog from "./ThemeFormDialog";
import { createTheme } from "../../../services/themes.service";
import { Theme } from "../../../lib/constants";
import { useNavigate } from "react-router-dom";

interface ThemeCreateFormDialogProps {
  trigger?: any;
  dictionaryId: string;
  redirectOnSuccess?: boolean;
}

const ThemeCreateFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  ThemeCreateFormDialogProps
> = ({ trigger, dictionaryId, redirectOnSuccess }, ref) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTheme,
  });

  const navigate = useNavigate();

  const onCreateTheme = async (values: ThemeFormSchemaType) => {
    try {
      return await createMutation.mutateAsync(values);
    } catch (error: any) {
      console.log("create Theme error:", error);
      return undefined;
    }
  };

  const onAfterCreate = (value: Theme | undefined) => {
    if (redirectOnSuccess) {
      navigate(`/dictionaries/${dictionaryId}/themes/${value?.id}`);
    }

    queryClient.cancelQueries(["themes-list"]);

    const previousData =
      queryClient.getQueryData<Theme[]>(["themes-list"]) ?? [];

    queryClient.setQueriesData(["themes-list"], [value, ...previousData]);
  };

  return (
    <ThemeFormDialog
      ref={ref}
      trigger={trigger}
      title={"Create Theme"}
      values={{ dictionary: dictionaryId, title: "", description: "" }}
      onSubmitCallback={onCreateTheme}
      onDialogClose={onAfterCreate}
    />
  );
};

export default React.forwardRef(ThemeCreateFormDialog);
