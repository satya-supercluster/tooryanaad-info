import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const loadingContainer = {
    display: "flex",
    justifyContent: "space-around",
    width: "4rem",
  };

  const loadingCircle = {
    display: "block",
    width: "1rem",
    height: "1rem",
    backgroundColor: "#3498db",
    borderRadius: "0.5rem",
  };

  const bounceTransition = {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500">
      <div style={loadingContainer}>
        <motion.span
          style={loadingCircle}
          transition={bounceTransition}
          animate={{
            y: ["0%", "-100%", "0%"],
          }}
          viewport={{ once: false }}
        />
        <motion.span
          style={loadingCircle}
          transition={{ ...bounceTransition, delay: 0.2 }}
          animate={{
            y: ["0%", "-100%", "0%"],
          }}
          viewport={{ once: false }}
        />
        <motion.span
          style={loadingCircle}
          transition={{ ...bounceTransition, delay: 0.4 }}
          animate={{
            y: ["0%", "-100%", "0%"],
          }}
          viewport={{ once: false }}
        />
      </div>
    </div>
  );
};

export default Loader;
