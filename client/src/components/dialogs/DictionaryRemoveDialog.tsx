import React, { useState } from "react";
import DialogContainer, { DialogHandle } from "./DialogContainer";
import {
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
} from "@fluentui/react-components";
import SpinnerButton from "../buttons/SpinnerButton";

interface DictionaryDialogProps {
  onSubmitCallback: () => Promise<boolean>;
}

const DictionaryDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryDialogProps
> = ({ onSubmitCallback }, ref) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const onSubmit = async () => {
    if (isBusy) {
      return;
    }

    setIsBusy(true);
    await onSubmitCallback();
    setIsBusy(false);
  };

  return (
    <DialogContainer ref={ref}>
      <DialogBody>
        <DialogTitle>Remove Dictionary</DialogTitle>
        <DialogContent>
          This dialog cannot be dismissed by clicking on the backdrop nor by
          pressing Escape. Close button should be pressed to dismiss this Alert
        </DialogContent>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" disabled={isBusy}>
              Cancel
            </Button>
          </DialogTrigger>
          <SpinnerButton
            appearance="primary"
            onClick={onSubmit}
            isBusy={isBusy}
          >
            Remove
          </SpinnerButton>
        </DialogActions>
      </DialogBody>
    </DialogContainer>
  );
};

export default React.forwardRef(DictionaryDialog);
