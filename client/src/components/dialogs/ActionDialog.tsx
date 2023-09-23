import React, { useState } from "react";
import {
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
} from "@fluentui/react-components";
import SpinnerButton from "../buttons/SpinnerButton";
import DialogContainer, { DialogHandle } from "./DialogContainer";

interface ActionDialogProps {
  onSubmitCallback: () => Promise<boolean>;
  title: string;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  description?: string;
}

const ActionDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  ActionDialogProps
> = (
  { onSubmitCallback, primaryBtnLabel, secondaryBtnLabel, description, title },
  ref
) => {
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{description}</DialogContent>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" disabled={isBusy}>
              {secondaryBtnLabel ?? "Cancel"}
            </Button>
          </DialogTrigger>
          <SpinnerButton
            appearance="primary"
            onClick={onSubmit}
            isBusy={isBusy}
          >
            {primaryBtnLabel ?? "Confirm"}
          </SpinnerButton>
        </DialogActions>
      </DialogBody>
    </DialogContainer>
  );
};

export default React.forwardRef(ActionDialog);
