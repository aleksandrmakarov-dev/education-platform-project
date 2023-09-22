import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from "@fluentui/react-breadcrumb-preview";
import React from "react";
import { cn } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

export type BreadcrumbItemData = {
  text: string;
  route: string;
};

interface BreadcrumbContainerProps {
  items: BreadcrumbItemData[];
}

const BreadcrumbContainer: React.FC<BreadcrumbContainerProps> = ({ items }) => {
  const navigate = useNavigate();

  const length = items.length - 1;
  return (
    <Breadcrumb size="medium">
      {items.map((item, i) => {
        const isActive = i === length;

        return (
          <React.Fragment key={item.route}>
            <BreadcrumbItem>
              <Link
                className={cn("px-1 py-0.5", {
                  "!font-semibold !text-gray-800": isActive,
                  "text-gray-600": !isActive,
                })}
                to={item.route}
              >
                {item.text}
              </Link>
            </BreadcrumbItem>
            {!isActive && <BreadcrumbDivider />}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbContainer;
