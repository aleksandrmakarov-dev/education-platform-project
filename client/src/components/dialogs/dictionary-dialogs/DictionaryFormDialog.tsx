import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import React, { useState } from "react";
import useImperativeHandleDialog, {
  DialogHandle,
} from "../../../hooks/useImperativeDialog";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../../lib/validations/dictionary-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DictionaryForm from "../../forms/DictionaryForm";
import SpinnerButton from "../../buttons/SpinnerButton";

interface DictionaryFormDialogProps {
  trigger?: any;
  title: string;
  defaultValues?: DictionaryFormSchemaType;
  values?: DictionaryFormSchemaType;
  onSubmitCallback: (values: DictionaryFormSchemaType) => Promise<boolean>;
}

const DictionaryFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryFormDialogProps
> = ({ trigger, title, onSubmitCallback, defaultValues, values }, ref) => {
  const { isOpen, setIsOpen } = useImperativeHandleDialog(ref);

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DictionaryFormSchema),
    defaultValues: defaultValues ? defaultValues : { title: "" },
    values: values,
  });

  const onSubmit = async (formValues: DictionaryFormSchemaType) => {
    setIsBusy(true);
    await onSubmitCallback(formValues);
    reset();
    setIsBusy(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e, d) => setIsOpen(d.open)}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogSurface>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DictionaryForm register={register} errors={errors} />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <SpinnerButton appearance="primary" type="submit" isBusy={isBusy}>
                Save
              </SpinnerButton>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default React.forwardRef(DictionaryFormDialog);
