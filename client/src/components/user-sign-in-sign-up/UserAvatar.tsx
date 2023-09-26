import { Avatar } from "@mui/material";
import React from "react";

interface UserAvatarProps {
  name: string;
  image?: string;
  fallback: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, image, fallback }) => {
  return (
    <div className="flex gap-2 items-center font-semibold hover:cursor-pointer">
      <Avatar src={image}>{fallback}</Avatar>
      <p className=" hover:underline">Hello, {name}</p>
    </div>
  );
};

export default UserAvatar;
