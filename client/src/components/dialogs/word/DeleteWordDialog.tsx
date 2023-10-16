import React, { useRef } from "react";
import { Word } from "../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import WordsService from "../../../services/words.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import DialogBase from "../base/DialogBase";
import { queryNames } from "../../../lib/constants";

interface DeleteWordDialogProps {
  trigger?: JSX.Element;
  word?: Word;
}

const DeleteWordDialog: React.FC<DeleteWordDialogProps> = ({
  trigger,
  word,
}) => {
  const queryClient = useQueryClient();

  const dialogRef = useRef<OpenCloseHandle>(null);

  const { push } = useSnackbar();

  // How to handle errors???
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: WordsService.deleteById,
  });

  const onSubmit = async () => {
    if (!word) {
      return;
    }

    try {
      await mutateAsync(word.id);
      dialogRef.current?.close();

      push({ message: "Word deleted successfully", type: "success" });

      queryClient.invalidateQueries([queryNames.word.list]);
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
      primaryBtnLabel="Yes, delete word"
      secondaryBtnLabel="Cancel, keep word"
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
