import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ThemeFormSchema,
  ThemeFormSchemaType,
} from "../../../lib/validations/theme-form.schema";
import ThemeForm from "../../forms/theme/ThemeForm";
import { OpenCloseHandle } from "../../../hooks/useImperativeDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThemesService from "../../../services/themes.service";
import useSnackbar from "../../../hooks/useSnackbar";
import { queryNames } from "../../../lib/constants";

interface CreateThemeDialogProps {
  trigger: JSX.Element;
  dictionary: string;
}

const CreateThemeDialog: React.FC<CreateThemeDialogProps> = ({
  trigger,
  dictionary,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: ThemesService.create,
  });

  const defaultValues: ThemeFormSchemaType = {
    title: "",
    description: "",
    dictionary: dictionary,
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
  });

  const onSubmit = async (values: ThemeFormSchemaType) => {
    try {
      await mutateAsync(values);
      reset();
      dialogRef.current?.close();

      push({ message: "Theme created successfully", type: "success" });
      // Instead of invalidation maybe use setQueryData ?
      queryClient.invalidateQueries([queryNames.theme.list]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      trigger={trigger}
      title="Create theme"
      onSubmit={handleSubmit(onSubmit)}
      ref={dialogRef}
      reset={() => reset()}
      isBusy={isLoading}
    >
      <ThemeForm setValue={setValue} register={register} errors={errors} />
    </DialogFormBase>
  );
};

export default CreateThemeDialog;
