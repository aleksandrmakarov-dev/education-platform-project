import React from "react";
import useCurrentUser from "../../../hooks/shared/useCurrentUser";

interface ProtectionWrapperProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectionWrapper: React.FC<ProtectionWrapperProps> = ({
  children,
  roles,
}) => {
  const { user } = useCurrentUser();

  if (!user || (roles && !user.roles.some((role) => roles.includes(role)))) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectionWrapper;
