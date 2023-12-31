import React, { useRef } from "react";
import { Theme } from "../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import ThemesService from "../../../services/themes.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import DialogBase from "../base/DialogBase";
import { queryNames } from "../../../lib/constants";

interface DeleteThemeDialogProps {
  trigger: JSX.Element;
  theme?: Theme;
}

const DeleteThemeDialog: React.FC<DeleteThemeDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ThemesService.deleteById,
  });

  const onSubmit = async () => {
    if (!theme) {
      return;
    }

    try {
      await mutateAsync(theme.id);
      dialogRef.current?.close();

      push({ message: "Theme deleted successfully", type: "success" });

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
    <DialogBase
      trigger={trigger}
      title="Are you absolutely sure?"
      onSubmit={onSubmit}
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
            <li>{theme?.words?.length ?? 0} word(s)</li>
          </ul>
          <p>This process deletes the theme and all related resources.</p>
        </div>
      </div>
    </DialogBase>
  );
};

export default DeleteThemeDialog;
