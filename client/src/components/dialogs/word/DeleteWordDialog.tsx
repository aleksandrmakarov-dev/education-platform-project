import React, { useRef } from "react";
import { Word } from "../../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpenCloseHandle } from "../../../hooks/shared/useImperativeDialog";
import WordsService from "../../../services/words.service";
import useSnackbar from "../../../hooks/shared/useSnackbar";
import DialogBase from "../base/DialogBase";
import { queryNames } from "../../../lib/constants";
import { PageResult } from "../../../services/base.service";

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

      const queryKey = [queryNames.word.list, word.theme];

      queryClient.cancelQueries(queryKey);
      const previousData = queryClient.getQueryData<PageResult<Word>>(queryKey);
      queryClient.setQueryData(queryKey, {
        items: previousData?.items?.filter((w) => w.id !== word.id),
        meta: {
          count: (previousData?.meta?.count ?? 1) - 1,
        },
      });

      push({ message: "Word deleted successfully", type: "success" });

      // queryClient.invalidateQueries([queryNames.word.list]);
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
