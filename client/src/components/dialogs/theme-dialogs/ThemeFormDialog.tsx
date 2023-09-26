import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import useImperativeHandleDialog, {
  DialogHandle,
} from "../../../hooks/useImperativeDialog";
import {
  ThemeFormSchema,
  ThemeFormSchemaType,
} from "../../../lib/validations/theme-form.schema";
import ThemeForm from "../../forms/ThemeForm";
import { Theme } from "../../../lib/constants";

interface ThemeFormDialogProps {
  trigger?: JSX.Element;
  title: string;
  defaultValues?: ThemeFormSchemaType;
  values?: ThemeFormSchemaType;
  onSubmitCallback: (values: ThemeFormSchemaType) => Promise<Theme | undefined>;
  onDialogClose?: (value: Theme | undefined) => void;
}

const ThemeFormDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  ThemeFormDialogProps
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
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : { title: "", description: "" },
    values: values,
  });

  const onSubmit = async (formValues: ThemeFormSchemaType) => {
    setIsBusy(true);
    const theme = await onSubmitCallback(formValues);
    reset();
    setIsBusy(false);
    setIsOpen(false);

    if (onDialogClose) {
      onDialogClose(theme);
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
            <ThemeForm register={register} errors={errors} />
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

export default React.forwardRef(ThemeFormDialog);
