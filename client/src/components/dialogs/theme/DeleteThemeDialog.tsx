import React, { useRef } from "react";
import DialogFormBase from "../DialogFormBase";
import { Theme } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ThemeFormSchema } from "../../../lib/validations/theme-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import { deleteThemeById } from "../../../services/themes.service";

interface DeleteThemeDialogProps {
  trigger: JSX.Element;
  theme?: Theme;
}

const DeleteThemeDialog: React.FC<DeleteThemeDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: deleteThemeById,
  });

  const onSubmit = async () => {
    if (!theme) {
      return;
    }

    try {
      await mutateAsync(theme.id);
      dialogRef.current?.close();

      queryClient.invalidateQueries(["themes"]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DialogFormBase
      trigger={trigger}
      title="Are you absolutely sure?"
      onSubmit={onSubmit}
      reset={() => {}}
      isBusy={isLoading}
      ref={dialogRef}
      primaryBtnColor="error"
      primaryBtnLabel="Yes, delete theme"
      secondaryBtnLabel="Cancel, keep theme"
    >
      <div className="flex flex-col gap-1">
        <div className="bg-red-100 px-5 py-2.5 rounded-sm">
          <p className="font-semibold">
            You are about to delete this theme containing:
          </p>
          <ul className="list-inside list-disc">
            <li>{theme?.terms?.length} terms(s)</li>
          </ul>
          <p>This process deletes the theme and all related resources.</p>
        </div>
      </div>
    </DialogFormBase>
  );
};

export default DeleteThemeDialog;
