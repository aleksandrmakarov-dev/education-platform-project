import React, { cloneElement, useState } from "react";
import useImperativeHandleDialog, {
  DialogHandle,
} from "../../../hooks/useImperativeDialog";
import {
  DictionaryFormSchema,
  DictionaryFormSchemaType,
} from "../../../lib/validations/dictionary-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DictionaryForm from "../../forms/DictionaryForm";
import { Dictionary } from "../../../lib/constants";

interface DictionaryFormDialogProps {
  trigger?: JSX.Element;
  title: string;
  defaultValues?: DictionaryFormSchemaType;
  values?: DictionaryFormSchemaType;
  onSubmitCallback: (
    values: DictionaryFormSchemaType
  ) => Promise<Dictionary | undefined>;
  onDialogClose?: (value: Dictionary | undefined) => void;
}

const DictionaryFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  DictionaryFormDialogProps
> = (
  { trigger, title, onSubmitCallback, defaultValues, values, onDialogClose },
  ref
) => {
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
    const dictionary = await onSubmitCallback(formValues);
    reset();
    setIsBusy(false);
    setIsOpen(false);

    if (onDialogClose) {
      onDialogClose(dictionary);
    }
  };

  const handleOpen = (beforeOpen?: () => void) => {
    if (beforeOpen) {
      beforeOpen();
    }

    setIsOpen(true);
  };
  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      {trigger &&
        cloneElement(trigger, {
          onClick: () => handleOpen(trigger.props.onClick),
        })}
      <Dialog open={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DictionaryForm register={register} errors={errors} />
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose} disabled={isBusy}>
              Close
            </Button>
            <LoadingButton
              variant="contained"
              disableElevation
              type="submit"
              loading={isBusy}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default React.forwardRef(DictionaryFormDialog);
