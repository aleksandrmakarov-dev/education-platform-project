import React, { useRef } from "react";
import { Word } from "../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import WordsService from "../../../services/themes.service";
import useSnackbar from "../../../hooks/useSnackbar";
import DialogBase from "../base/DialogBase";

interface DeleteWordDialogProps {
  trigger: JSX.Element;
  theme?: Word;
}

const DeleteWordDialog: React.FC<DeleteWordDialogProps> = ({
  trigger,
  theme,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<DialogHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: WordsService.deleteById,
  });

  const onSubmit = async () => {
    if (!theme) {
      return;
    }

    try {
      await mutateAsync(theme.id);
      dialogRef.current?.close();

      push({ message: "Word deleted successfully", type: "success" });

      queryClient.invalidateQueries(["themes"]);
    } catch (error: any) {
      console.log(error);
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
          <p>This process deletes the word and all related resources.</p>
        </div>
      </div>
    </DialogBase>
  );
};

export default DeleteWordDialog;
