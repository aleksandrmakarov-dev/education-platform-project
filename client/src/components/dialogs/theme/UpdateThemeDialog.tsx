import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import { Theme } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ThemeFormSchemaType,
  ThemeFormSchema,
} from "../../../lib/validations/theme-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import ThemeForm from "../../forms/theme/ThemeForm";
import ThemesService from "../../../services/themes.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import { queryNames } from "../../../lib/constants";

interface UpdateThemeDialogProps {
  trigger: JSX.Element;
  theme?: Theme;
}

const UpdateThemeDialog: React.FC<UpdateThemeDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ThemesService.updateById,
  });

  const defaultValues: ThemeFormSchemaType = {
    title: "",
    description: "",
    dictionary: "",
    languageFrom: "en-US",
    languageTo: "en-US",
  };

  const { handleSubmit, reset, control } = useForm<ThemeFormSchemaType>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: defaultValues,
    values: theme ? { ...theme } : defaultValues,
  });

  const onSubmit = async (values: ThemeFormSchemaType) => {
    if (!theme) {
      return;
    }

    try {
      await mutateAsync({ identifier: theme.id, body: values });
      reset();
      dialogRef.current?.close();

      push({ message: "Theme updated successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.theme.list]);
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
      title="Update theme"
      onSubmit={handleSubmit(onSubmit)}
      reset={() => reset()}
      isBusy={isLoading}
      ref={dialogRef}
    >
      <ThemeForm control={control} />
    </DialogFormBase>
  );
};

export default UpdateThemeDialog;
