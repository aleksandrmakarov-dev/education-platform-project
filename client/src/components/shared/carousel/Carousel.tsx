import { Button, MobileStepper } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface CarouselProps {
  count: number;
  children: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({ count, children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    if (activeStep >= count - 1) {
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep <= 0) {
      return;
    }

    setActiveStep(activeStep - 1);
  };

  return (
    <div className="w-[768px]">
      {children[activeStep]}
      <MobileStepper
        variant="text"
        steps={count}
        activeStep={activeStep}
        position="static"
        backButton={
          <Button onClick={handleBack}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
        nextButton={
          <Button onClick={handleNext}>
            Next <KeyboardArrowRight />
          </Button>
        }
      />
    </div>
  );
};

export default Carousel;
