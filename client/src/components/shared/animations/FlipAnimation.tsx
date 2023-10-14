import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlipAnimationProps {
  children: React.ReactNode;
}

const FlipAnimation: React.FC<FlipAnimationProps> = ({ children }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <motion.div
      onClick={handleFlip}
      initial={{ perspective: "500px" }}
      animate={{ rotateX: flipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FlipAnimation;
