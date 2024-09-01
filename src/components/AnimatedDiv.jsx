import React from 'react'
import { motion } from 'framer-motion';


// Custom hook for random animation
const useRandomAnimation = () => {
  const directions = ["left", "right"];
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];
  return {
    hidden: { opacity: 0, x: randomDirection === "left" ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };
};

const AnimatedDiv = ({ children, className }) => {
  const animation = useRandomAnimation();
  return (
    <motion.div
      variants={animation}
      initial="hidden"
      whileInView="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv