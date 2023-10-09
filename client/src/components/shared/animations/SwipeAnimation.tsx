import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export type SwipeDirection = "right" | "left";

interface SwipeAnimationProps {
  children?: JSX.Element[];
  direction: SwipeDirection;
  index: number;
  setAnimationRunning: (value: boolean) => void;
}

const SwipeAnimation: React.FC<SwipeAnimationProps> = ({
  children,
  direction,
  index,
  setAnimationRunning,
}) => {
  const x = direction === "left" ? 100 : -100;

  const onAnimationStart = () => {
    setAnimationRunning(true);
  };

  const onAnimationComplete = () => {
    setAnimationRunning(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
        key={index}
        initial={{ x: x }}
        animate={{ x: 0 }}
        exit={{ opacity: 0, x: -x }}
        transition={{ duration: 0.2 }}
      >
        {children && children[index]}
      </motion.div>
    </AnimatePresence>
  );
};

export default SwipeAnimation;
