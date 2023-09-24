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
import { Dictionary } from "../../../lib/constants";
import { DialogHandle } from "../../../hooks/useImperativeDialog";
import DictionaryCreateFormDialog from "../../dialogs/dictionary-dialogs/DictionaryCreateFormDialog";
import DictionaryUpdateFormDialog from "../../dialogs/dictionary-dialogs/DictionaryUpdateFormDialog";

interface DictionaryCardMenuProps {
  dictionary: Dictionary;
}

const DictionaryCardMenu: React.FC<DictionaryCardMenuProps> = ({
  dictionary,
}) => {
  const updateDictionaryDialogRef = useRef<DialogHandle>(null);

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
              icon={<Edit16Filled />}
              onClick={() => {
                updateDictionaryDialogRef.current?.open();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem icon={<Delete16Filled />}>Remove</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <DictionaryUpdateFormDialog
        id={dictionary.id}
        formValues={{ title: dictionary.title }}
        ref={updateDictionaryDialogRef}
      />
    </>
  );
};

export default DictionaryCardMenu;
