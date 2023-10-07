import React, { useState } from "react";
import { m } from "framer-motion";

interface FlipAnimationProps {
  children: React.ReactNode;
}

const FlipAnimation: React.FC<FlipAnimationProps> = ({ children }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const onContainerClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div onClick={onContainerClick}>
      <m.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 180 }}
        transition={{ duration: 0.2 }}
      >
        <m.div initial={{ rotateX: 0 }} animate={{ rotateX: 180 }}>
          {children}
        </m.div>
      </m.div>
    </div>
  );
};

export default FlipAnimation;
