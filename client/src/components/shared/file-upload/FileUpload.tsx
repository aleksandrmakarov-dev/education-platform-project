import { Button, Input, Paper } from "@mui/material";
import FileUploadItem, { FileUploadItemState } from "./FileUploadItem";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { v4 as uuidv4 } from "uuid";
import prettyBytes from "pretty-bytes";
import { AxiosProgressEvent } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SignData } from "../../../lib/types";
import FileSystemService from "../../../services/filesystem.service";

export type FileData = {
  id: string;
  name: string;
  type: string;
  size: string;
  progress: number;
  state: FileUploadItemState;
  url?: string;
};

export type FileUploadState = "idle" | "uploading";

interface FileUploadProps {
  onCallback: (files: FileData[]) => void;
  multiple?: boolean;
  path?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple,
  onCallback,
  path,
}) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const filesRef = useRef<FileData[]>([]);
  const [state, setState] = useState<FileUploadState>("idle");

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const { mutate: uploadMutate } = useMutation({
    mutationFn: ({
      file,
      signData,
      onUploadProgress,
    }: {
      file: File;
      signData: SignData;
      onUploadProgress: (e: AxiosProgressEvent) => void;
    }) => FileSystemService.uploadFile(file, signData, onUploadProgress),
  });

  const { data: signData } = useQuery({
    queryKey: ["signData"],
    queryFn: async () => await FileSystemService.getSignature(path),
    refetchOnWindowFocus: false,
  });

  const updateUploadProgress = (id: string, newProgress: number) => {
    const fileToUpdate = filesRef.current.find((f) => f.id === id);

    if (!fileToUpdate) {
      return;
    }

    if (fileToUpdate.state !== "uploading") {
      return;
    }

    const updatedFile = { ...fileToUpdate, progress: newProgress };

    setFiles(filesRef.current.map((f) => (f.id === id ? updatedFile : f)));
  };

  const updateUploadState = (
    id: string,
    state: FileUploadItemState,
    url?: string
  ) => {
    const fileToUpdate = filesRef.current.find((f) => f.id === id);

    if (!fileToUpdate) {
      return;
    }

    if (fileToUpdate.state !== "uploading") {
      return;
    }

    const updatedFile = { ...fileToUpdate, state: state, url: url };

    const filesAfterChange = filesRef.current.map((f) =>
      f.id === id ? updatedFile : f
    );
    setFiles(filesAfterChange);

    if (filesAfterChange.every((f) => f.state === "success")) {
      setState("idle");
    }
    onCallback(filesAfterChange);
  };

  const onProgressChange = (id: string) => (event: AxiosProgressEvent) => {
    if (event && event.loaded && event.total) {
      const newProgress = Math.round((100 * event.loaded) / event.total);
      updateUploadProgress(id, newProgress);
    }
  };

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!signData) {
      console.log("You are not authorized to upload files");
      return;
    }

    const id = uuidv4();
    const file = e.currentTarget.files?.item(0);

    if (file) {
      const newFile: FileData = {
        id: id,
        name: file.name,
        type: file.type,
        size: prettyBytes(file.size),
        progress: 0,
        state: "uploading",
      };

      if (multiple) {
        setFiles([...files, newFile]);
      } else {
        setFiles([newFile]);
      }

      setState("uploading");

      uploadMutate(
        {
          file: file,
          signData: signData,
          onUploadProgress: onProgressChange(id),
        },
        {
          onSuccess: (data: any) => {
            updateUploadState(id, "success", data.url);
          },
          onError: (error: any) => {
            updateUploadState(id, "failed");
            console.log("error:", error);
          },
        }
      );
    }
  };

  const onFileRemove = (id: string) => {
    const filesAfterRemove = filesRef.current.filter((f) => f.id !== id);
    setFiles(filesAfterRemove);
    onCallback(filesAfterRemove);
  };

  return (
    <Paper variant="outlined" sx={{ borderColor: "lightgray" }}>
      <div className="flex gap-10 items-center justify-between pl-0.5 pr-2 py-0.5">
        <Button component="label" variant="text">
          Select file
          <Input type="file" sx={{ display: "none" }} onChange={onFileSelect} />
        </Button>
        <div className="text-sm flex items-center gap-1 text-gray-600">
          {state === "idle" ? (
            <p>Choose file(s) to upload</p>
          ) : (
            <>
              <UploadRoundedIcon />
              <p>Uploading...</p>
            </>
          )}
        </div>
      </div>
      {files && files.length > 0 && (
        <div className="border-t border-gray-200">
          {files.map((file) => (
            <FileUploadItem
              key={file.id}
              {...file}
              onRemove={() => onFileRemove(file.id)}
            />
          ))}
        </div>
      )}
    </Paper>
  );
};

export default FileUpload;
