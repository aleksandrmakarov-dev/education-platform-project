import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export type SwipeDirection = "right" | "left";

interface SwipeAnimationProps {
  children?: JSX.Element[];
  direction: SwipeDirection;
  index: number;
}

const SwipeAnimation: React.FC<SwipeAnimationProps> = ({
  children,
  direction,
  index,
}) => {
  const x = direction === "left" ? 100 : -100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ x: x }}
        animate={{ x: 0 }}
        exit={{ opacity: 0, x: -x }}
        transition={{ duration: 0.25 }}
      >
        {children && children[index]}
      </motion.div>
    </AnimatePresence>
  );
};

export default SwipeAnimation;
