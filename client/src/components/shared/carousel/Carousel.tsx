import { Button, MobileStepper } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeAnimation, { SwipeDirection } from "../animations/SwipeAnimation";

interface CarouselProps {
  count: number;
  children: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({ count, children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [direction, setDirection] = useState<SwipeDirection>("left");
  const [animationRunning, setAnimationRunning] = useState<boolean>(false);

  const handleNext = () => {
    if (activeStep >= count - 1) {
      return;
    }
    setDirection("left");
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep <= 0) {
      return;
    }
    setDirection("right");
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="max-w-screen-md w-full">
      <SwipeAnimation
        direction={direction}
        index={activeStep}
        setAnimationRunning={setAnimationRunning}
        duration={0.15}
      >
        {children}
      </SwipeAnimation>
      <MobileStepper
        sx={{ backgroundColor: "transparent" }}
        variant="text"
        steps={count}
        activeStep={activeStep}
        position="static"
        backButton={
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || animationRunning}
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
        nextButton={
          <Button
            onClick={handleNext}
            disabled={activeStep === count - 1 || animationRunning}
          >
            Next <KeyboardArrowRight />
          </Button>
        }
      />
    </div>
  );
};

export default Carousel;
