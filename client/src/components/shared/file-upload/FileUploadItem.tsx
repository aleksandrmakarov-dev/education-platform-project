import React from "react";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { IconButton, LinearProgress } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { cn } from "../../../lib/utils";

export type FileUploadItemState = "uploading" | "failed" | "success";

interface FileUploadItemProps {
  name: string;
  size: string;
  state: FileUploadItemState;
  progress: number;
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({
  name,
  size,
  state,
  progress,
}) => {
  return (
    <div className="px-2 mb-2">
      <div className="flex items-center my-1 justify-between">
        <div className="flex items-center gap-2">
          <InsertDriveFileRoundedIcon
            className="text-gray-600"
            sx={{ fontSize: 28 }}
          />
          <div>
            <p className="text-sm text-gray-600">{name}</p>
            <p
              className={cn("text-xs", {
                "text-green-500": state === "success",
                "text-red-500": state === "failed",
              })}
            >
              {state === "uploading" && size}
              {state === "success" && "File(s) successfully uploaded"}
              {state === "failed" && "File(s) failed to upload"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {state === "uploading" && (
            <>
              <p className="text-sm">{progress}%</p>
              <IconButton size="small">
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}
          {state === "failed" && (
            <>
              <IconButton size="small">
                <ReplayRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small">
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}
          {state === "success" && (
            <>
              <IconButton size="small">
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}
        </div>
      </div>
      {state === "uploading" && (
        <LinearProgress variant="determinate" value={progress} />
      )}
    </div>
  );
};

export default FileUploadItem;
