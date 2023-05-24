import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Motion = (props: Props) => {
  const { children } = props;

  return (
    <motion.div
      initial={{ opacity: 0.05 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        stiffness: 70,
        damping: 70,
        delay: 0.3,
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
