import { Field, Input } from "@fluentui/react-components";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { DictionaryFormSchemaType } from "../../lib/validations/dictionary-form.schema";

interface DictionaryFormProps {
  register: UseFormRegister<DictionaryFormSchemaType>;
  errors: FieldErrors<DictionaryFormSchemaType>;
}

const DictionaryForm: React.FC<DictionaryFormProps> = ({
  register,
  errors,
}) => {
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
    </div>
  );
};

export default DictionaryForm;
