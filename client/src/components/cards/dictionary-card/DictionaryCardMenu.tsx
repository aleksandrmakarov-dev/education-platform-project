import {
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import {
  MoreVertical20Regular,
  Delete16Filled,
  Edit16Filled,
} from "@fluentui/react-icons";
import React, { useRef } from "react";
import DictionaryDialog from "../../dialogs/DictionaryDialog";
import { Dictionary } from "../../../lib/constants";
import { DictionaryFormSchemaType } from "../../../lib/validations/dictionary-form.schema";
import { DialogHandle } from "../../dialogs/DialogContainer";
import DictionaryRemoveDialog from "../../dialogs/DictionaryRemoveDialog";

interface DictionaryCardMenuProps {
  dictionary: Dictionary;
  onUpdateCallback: (
    id: string,
    values: DictionaryFormSchemaType
  ) => Promise<boolean>;
  onRemoveCallback: (id: string) => Promise<boolean>;
}

const DictionaryCardMenu: React.FC<DictionaryCardMenuProps> = ({
  dictionary,
  onRemoveCallback,
  onUpdateCallback,
}) => {
  const updateDialogRef = useRef<DialogHandle>(null);
  const removeDialogRef = useRef<DialogHandle>(null);

  const onUpdate = async (values: DictionaryFormSchemaType) => {
    const isSuccess = await onUpdateCallback(dictionary.id, values);
    if (isSuccess) {
      updateDialogRef.current?.close();
    }
    return isSuccess;
  };

  const onRemove = async () => {
    const isSuccess = await onRemoveCallback(dictionary.id);
    if (isSuccess) {
      removeDialogRef.current?.close();
    }
    return isSuccess;
  };

  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="transparent"
            icon={<MoreVertical20Regular />}
            aria-label="More options"
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem
              onClick={() => updateDialogRef.current?.open()}
              icon={<Edit16Filled />}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => removeDialogRef.current?.open()}
              icon={<Delete16Filled />}
            >
              Remove
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <DictionaryDialog
        ref={updateDialogRef}
        title="Update Dictionary"
        defaultValues={{ name: dictionary.name }}
        onSubmitCallback={onUpdate}
      />
      <DictionaryRemoveDialog
        ref={removeDialogRef}
        onSubmitCallback={onRemove}
      />
    </>
  );
};

export default DictionaryCardMenu;
