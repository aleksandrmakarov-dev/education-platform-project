import {
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
} from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SpinnerButton from "../../buttons/SpinnerButton";
import DialogContainer, { DialogHandle } from "../DialogContainer";
import {
  ThemeFormSchema,
  ThemeFormSchemaType,
} from "../../../lib/validations/theme-form.schema";
import ThemeForm from "../../forms/ThemeForm";

interface ThemeCreateUpdateDialogProps {
  onSubmitCallback: (values: ThemeFormSchemaType) => Promise<boolean>;
  defaultValues?: ThemeFormSchemaType;
  title: string;
}

const ThemeCreateUpdateDialog: React.ForwardRefRenderFunction<
  DialogHandle,
  ThemeCreateUpdateDialogProps
> = ({ onSubmitCallback, defaultValues, title }, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : { name: "", description: "" },
    values: defaultValues ? defaultValues : { name: "", description: "" },
  });

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const onSubmit = async (values: ThemeFormSchemaType) => {
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
            <ThemeForm register={register} errors={errors} />
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

export default React.forwardRef(ThemeCreateUpdateDialog);
