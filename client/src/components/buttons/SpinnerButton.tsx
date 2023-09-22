import { Button, ButtonProps, Spinner } from "@fluentui/react-components";
import React from "react";

type SpinnerButtonProps = {
  isBusy?: boolean;
} & ButtonProps;

const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  isBusy,
  children,
  ...props
}) => {
  const spinnerAppearence: "inverted" | "primary" | undefined =
    props.appearance === "primary" ? "inverted" : "primary";

  return (
    <Button {...props}>
      {isBusy && (
        <Spinner
          appearance={spinnerAppearence}
          size="extra-tiny"
          className="mr-2"
        />
      )}
      <span>{children}</span>
    </Button>
  );
};

export default SpinnerButton;
