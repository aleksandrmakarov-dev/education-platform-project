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
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ThemeFormSchemaType>({
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

      // queryClient.cancelQueries(["dictionaries"]);
      // const previousData = queryClient.getQueryData<Theme[]>([
      //   "dictionaries",
      // ]);
      // console.log(previousData);
      // queryClient.setQueryData(
      //   ["dictionaries"],
      //   previousData?.map((item) =>
      //     item.id === updatedTheme.id ? updatedTheme : item
      //   )
      // );

      // For some reason code above does not work (previous data undefined)

      push({ message: "Theme updated successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.theme.list]);
    } catch (error: any) {
      console.log(error);
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
      <ThemeForm setValue={setValue} register={register} errors={errors} />
    </DialogFormBase>
  );
};

export default UpdateThemeDialog;
