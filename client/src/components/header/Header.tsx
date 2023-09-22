import React from "react";
import { cn } from "../../lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text, className }) => {
  return (
    <h2 className={cn("text-2xl font-semibold text-gray-800", className)}>
      {text}
    </h2>
  );
};

export default Header;
