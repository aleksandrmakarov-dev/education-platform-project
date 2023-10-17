import React from "react";
import { motion } from "framer-motion";

interface FlipAnimationProps {
  children: React.ReactNode;
  open: boolean;
}

const FlipAnimation: React.FC<FlipAnimationProps> = ({ children, open }) => {
  return (
    <motion.div
      initial={{ perspective: "500px" }}
      animate={{ rotateX: open ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      <motion.div
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FlipAnimation;
