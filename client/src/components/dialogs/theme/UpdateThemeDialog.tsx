import React, { useRef } from "react";
import DialogFormBase from "../DialogFormBase";
import { Theme } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ThemeFormSchemaType,
  ThemeFormSchema,
} from "../../../lib/validations/theme-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import { updateThemeById } from "../../../services/themes.service";
import ThemeForm from "../../forms/theme/ThemeForm";

interface UpdateThemeDialogProps {
  trigger: JSX.Element;
  theme?: Theme;
}

const UpdateThemeDialog: React.FC<UpdateThemeDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateThemeById,
  });

  const defaultValues: ThemeFormSchemaType = {
    title: "",
    description: "",
    dictionary: "",
    image: "",
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
      reset();
      dialogRef.current?.close();
      await mutateAsync({ id: theme.id, body: values });

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

      queryClient.invalidateQueries(["themes"]);
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
