import { Field, Input, Textarea } from "@fluentui/react-components";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ThemeFormSchemaType } from "../../lib/validations/theme-form.schema";

interface ThemeFormProps {
  register: UseFormRegister<ThemeFormSchemaType>;
  errors: FieldErrors<ThemeFormSchemaType>;
}

const ThemeForm: React.FC<ThemeFormProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <Field
        label="Name"
        required
        validationState={errors.name && "error"}
        validationMessage={errors.name?.message}
      >
        <Input {...register("name")} />
      </Field>
      <Field
        label="Description"
        validationState={errors.description && "error"}
        validationMessage={errors.description?.message}
      >
        <Textarea {...register("description")} />
      </Field>
    </div>
  );
};

export default ThemeForm;
