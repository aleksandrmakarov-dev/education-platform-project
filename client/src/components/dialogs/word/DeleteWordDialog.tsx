import React, { useRef } from "react";
import DialogFormBase from "../base/DialogFormBase";
import { Word } from "../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import WordsService from "../../../services/themes.service";

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
          <p>This process deletes the word and all related resources.</p>
        </div>
      </div>
    </DialogFormBase>
  );
};

export default DeleteWordDialog;
