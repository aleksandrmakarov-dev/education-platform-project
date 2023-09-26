import React, { useEffect, useRef, useState } from "react";
import { Dictionary } from "../../lib/constants";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import DictionaryUpdateFormDialog from "../dialogs/dictionary-dialogs/DictionaryUpdateFormDialog";
import { DialogHandle } from "../../hooks/useImperativeDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useMenuHook from "../../hooks/useMenuHook";

interface DictionaryCardMenuProps {
  dictionary: Dictionary;
  trigger: any;
}

const DictionaryCardMenu: React.FC<DictionaryCardMenuProps> = ({
  trigger,
  dictionary,
}) => {
  const { isOpen, anchorEl, handleOpen, handleClose } = useMenuHook();

  const updateDialogRef = useRef<DialogHandle>(null);

  return (
    <React.Fragment>
      {React.cloneElement(trigger, { onClick: handleOpen })}
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        elevation={2}
        variant="selectedMenu"
      >
        <MenuList className="w-48">
          <MenuItem
            onClick={() => {
              handleClose();
              updateDialogRef.current?.open();
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Update</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              updateDialogRef.current?.open();
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Remove</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <DictionaryUpdateFormDialog
        ref={updateDialogRef}
        id={dictionary.id}
        formValues={{ title: dictionary.title }}
      />
    </React.Fragment>
  );
};

export default DictionaryCardMenu;
