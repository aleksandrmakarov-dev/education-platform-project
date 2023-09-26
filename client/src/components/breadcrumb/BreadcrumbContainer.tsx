import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export type BreadcrumbItemData = {
  text: string;
  route: string;
};

interface BreadcrumbContainerProps {
  items?: BreadcrumbItemData[];
}

const BreadcrumbContainer: React.FC<BreadcrumbContainerProps> = ({ items }) => {
  const navigate = useNavigate();

  if (!items) {
    return null;
  }

  const length = items.length - 1;
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {items.map((item, i) => {
        const isActive = i === length;

        return (
          <Link
            key={item.route}
            href={item.route}
            underline="hover"
            color={isActive ? "text.primary" : "inherit"}
          >
            {item.text}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbContainer;
