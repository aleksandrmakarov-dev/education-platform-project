import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import React, { useState } from "react";
import SpinnerButton from "../buttons/SpinnerButton";
import DictionaryForm from "../forms/DictionaryForm";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../lib/validations/dictionary-form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogContainer, { DialogHandle } from "./DialogContainer";

interface DictionaryDialogProps {
  onSubmitCallback: (values: DictionaryFormSchemaType) => Promise<boolean>;
  defaultValues?: DictionaryFormSchemaType;
  title: string;
}

const DictionaryDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryDialogProps
> = ({ onSubmitCallback, defaultValues, title }, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DictionaryFormSchema),
    defaultValues: defaultValues ? defaultValues : { name: "" },
    values: defaultValues ? defaultValues : { name: "" },
  });

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const onSubmit = async (values: DictionaryFormSchemaType) => {
    if (isBusy) {
      return;
    }

    setIsBusy(true);

    const success = await onSubmitCallback(values);
    if (success) {
      reset();
    }

    setIsBusy(false);
  };

  return (
    <DialogContainer ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DictionaryForm register={register} errors={errors} />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" disabled={isBusy}>
                Cancel
              </Button>
            </DialogTrigger>
            <SpinnerButton appearance="primary" type="submit" isBusy={isBusy}>
              Save
            </SpinnerButton>
          </DialogActions>
        </DialogBody>
      </form>
    </DialogContainer>
  );
};

export default React.forwardRef(DictionaryDialog);
